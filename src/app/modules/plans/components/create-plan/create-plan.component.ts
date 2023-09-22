import { ProductDetailsService } from 'src/app/modules/plans/services/product-details.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, takeUntil } from 'rxjs';
import { FeatureDetailsPopupComponent } from 'src/app/shared/components/dialog-box/feature-details-popup/feature-details-popup.component';
import { SuccessDialogComponent } from 'src/app/shared/components/dialog-box/success-dialog/success-dialog.component';
import {
  Frequency,
  Stepper,
  plan_add_empty_data,
} from 'src/app/shared/constants/consants';
import { PlanService } from '../../services/plan.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetPricePopupComponent } from 'src/app/shared/components/dialog-box/set-price-popup/set-price-popup.component';
import { ProductDetailsPopupComponent } from 'src/app/shared/components/dialog-box/product-details-popup/product-details-popup.component';
import { DeleteConfirmationComponent } from 'src/app/shared/components/dialog-box/delete-confirmation/delete-confirmation.component';
import { AddonDetailsPopupComponent } from 'src/app/shared/components/dialog-box/addon-details-popup/addon-details-popup.component';
import { NewChargePopupComponent } from 'src/app/shared/components/dialog-box/new-charge-popup/new-charge-popup.component';

export interface PeriodicElement {
  PricingCycle: string;
  Price: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { PricingCycle: 'Daily', Price: 'Set Price' },
  { PricingCycle: 'Weekly', Price: 'Set Price' },
  { PricingCycle: 'Monthly', Price: 'Set Price' },
  { PricingCycle: 'Yearly', Price: 'Set Price' },
];

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.scss'],
})
export class CreatePlanComponent implements OnInit {
  values: any;
  priceColumn: string[] = [
    'PricingCycle',
    'PricingModel',
    'BillingCycle',
    'Price',
    'action',
  ];
  status: boolean;
  priceData: any[] = [];
  planAddEmptyData = plan_add_empty_data;
  stepsTitle = Stepper;
  displayedColumns: string[] = ['PricingCycle', 'Price'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  testId: string;
  planForm: FormGroup;
  subscription: Subscription;
  data$ = this.planService.plan$;
  productDetails: any = [];
  productID: string;
  name: string;
  featureId: string;
  entitlement: string;
  PageNumber: any = '';
  limit: any = '';
  planId: string;
  featureLength: string;
  plandataById: any;
  pricedataById: any;
  selectedPriceId: string;
  priceModelArr: any[] = [];
  dialogRef: any;
  public stepOneCompleted: boolean = false;
  editable: boolean = false;
  features: { featureId: string; entitlement: string }[] = [];
  priceId: string;
  pricingData: any[] = [];
  dailyPrice: string;
  monthlyPrice: string;
  yearlyPrice: string;
  weeklyPrice: string;
  priceIdxArr: any[] = [];

  @ViewChild('step1') step1: ElementRef;
  @ViewChild('step2') step2: ElementRef;
  @ViewChild('step3') step3: ElementRef;
  @ViewChild('step4') step4: ElementRef;
  @ViewChild('step5') step5: ElementRef;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private planService: PlanService,
    private productDetailService: ProductDetailsService,
    private global: GlobalService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.planService.priceDataById$.subscribe((price) => {
      this.priceIdxArr.push(price.priceId);
      (this.priceId = price.priceId), this.getPriceById(this.priceId);
    });
    // Access pricedata from the service
    this.planDetails();
    this.planId = this.route.snapshot.params['id'];
    this.getPlanById(this.planId);
    this.planService.plan$.subscribe((data) => {
      if (data) {
        this.productDetails = data;
        for (const product of this.productDetails) {
          this.productID = product.productID;
          this.name = product.name;
          this.featureLength = product.features.length;

          for (const feature of product.features) {
            this.featureId = feature.featureId;
            this.entitlement = feature.value;
            this.features.push({
              featureId: this.featureId,
              entitlement: this.entitlement,
            });
          }
        }
      }
    });
  }

  setPricing(pricing: any) {
    
    if (pricing && pricing.periodUnit) {
      this.priceData.push(pricing);

      switch (pricing.periodUnit) {
        case 'daily':
          this.priceData[0] = pricing;
          this.dailyPrice = pricing.price;
          break;
        case 'weekly':
          this.priceData[1] = pricing;
          this.weeklyPrice = pricing.price;
          break;
        case 'monthly':
          this.priceData[2] = pricing;
          this.monthlyPrice = pricing.price;
          break;
        case 'yearly':
          this.priceData[3] = pricing;
          this.yearlyPrice = pricing.price;
          break;
        default:
          break;
      }
    }
  }

  /**
   * The function updates the pricing data by iterating through the given pricing array and updating
   * the corresponding period unit in the pricingData array.
   */
  updatePricingData(pricing: any) {
    this.pricingData = [];
    Frequency.forEach((x) => {
      this.pricingData.push({ periodUnit: x.title });
    });

    pricing.forEach((data: any) => {
      let unitIndex = this.pricingData.findIndex(
        (x: any) => x.periodUnit === data.periodUnit
      );

      if (unitIndex !== -1) {
        this.pricingData[unitIndex] = data;
      }
    });
  }

  /**
   * The function retrieves a plan by its ID and updates the pricing data, form values, and editable
   */
  getPlanById(id: string) {
    if (id) {
      this.stepOneCompleted = true;
      this.global.showLoader();
      this.planService
        .getPlanById(id)
        .pipe(takeUntil(this.global.componentDestroyed(this)))
        .subscribe((res) => {
          if (res) {            
            this.global.hideLoader();
            this.plandataById = res.data;            
            this.updatePricingData(res.data.pricing);
            this.setPricing(this.pricingData);
            this.patchValue(res.data);
            this.editable = true;
          }
        });
    } else {
      this.stepOneCompleted = false;
      this.editable = false;
      this.global.hideLoader();
    }
  }

  getPriceById(id: string) {
    if (id) {
      this.stepOneCompleted = true;
      this.global.showLoader();
      this.planService
        .getPriceById(id)
        .pipe(takeUntil(this.global.componentDestroyed(this)))
        .subscribe((res) => {
          this.global.hideLoader();
          this.pricedataById = res.data;
          this.setPricing(this.pricedataById);
          this.editable = true;
        });
    } else {
      this.stepOneCompleted = false;
      this.editable = false;
      this.global.hideLoader();
    }
  }

  /**
   * The patchValue function updates the form fields with the provided data and hides the loader.
   */
  patchValue(data: any) {
    if (data.status === 'active') {
      this.status = true;
    } else if (data.status === 'draft') {
      this.status = false;
    }
    this.planForm.patchValue({
      planId: data.planId,
      internalName: data.internalName,
      externalName: data.externalName,
      type: data.type,
      description: data.description,
      status: this.status,
    });
    this.global.hideLoader();
  }

  planDetails() {
    this.planForm = this.formBuilder.group({
      planId: ['', Validators.required],
      internalName: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9\s]*$/),
        ],
      ],
      externalName: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9\s]*$/),
        ],
      ],
      type: [''],
      description: ['', Validators.maxLength(500)],
      status: [true],
    });
  }

  setPlanId(event: any) {
    if (!this.editable) {
      const idValue = event.target.value
        ?.replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      this.planForm.get('planId').setValue(idValue);
    }
  }
  onSubmit() {
    this.global.showLoader();
    const status = this.planForm.value.status ? 'active' : 'draft';

    const type = 'base';
    const plan = {
      ...this.planForm.value,
      type: type,
      status: status,
    };

    this.stepOneCompleted = true;
    if (!this.editable) {
      this.planService
        .addPlan(plan)
        .pipe(takeUntil(this.global.componentDestroyed(this)))
        .subscribe({
          next: (res: any) => {
            this.global.hideLoader();
            this.openSuccess(plan.planId);
            return res;
          },
          error: (err: any) => {
            this.snackBar.open(err.message, '', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
            this.global.hideLoader();
          },
        });
    } else if (this.editable) {
      this.planService
        .updatePlan(plan, this.planId)
        .pipe(takeUntil(this.global.componentDestroyed(this)))
        .subscribe((res) => {
          this.openSuccess(plan.planId);
          this.global.hideLoader();
        });
    }
  }

  sendPriceId(priceId: string) {
    this.planService.deletePrice(priceId).subscribe({
      next: (res) => {
        const index = this.priceData.findIndex(
          (item) => item.priceId === priceId
        );
        if (index !== -1) {
          this.priceData.splice(index, 1);
        }
        this.getPlanById(this.planId);
      },
      error: (error: any) => {
        this.snackBar.open(error.error.message, '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
    });
  }
  deletePrice(pricingId: string) {
    
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      panelClass: 'dialog-curved',
      data: {
        module: 'Price',
        deleteId: pricingId,
      },
    });
    this.dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.sendPriceId(pricingId);
      }
    });
  }
  onDelete(id: string) {
    this.productDetailService.deleteProductVariant(id).subscribe(() => {
      this.data$.subscribe((res) => {
        return res;
      });
    });
  }

  openPopup(feature: any) {
    this.dialog.open(FeatureDetailsPopupComponent, {
      data: {
        featureId: feature,
      },
    });
  }
  editProductVariant(id: string) {
    this.router.navigate([`/plans/create/edit-product-detail/${id}`]);
  }
  openSuccess(id: string) {
    this.dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '420px',
      data: {
        module: 'Plan',
        operation: 'is created',
      },
    });
    this.dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.router.navigate([`/plans/create/${id}`]);
      }
    });
  }
  removeType(index: any) {
    this.planService.priceModelArr.splice(index, 1);
  }
  setPrice(planId: any, cycleValue: number, periodUnit: string) {
    const dialogRef = this.dialog.open(SetPricePopupComponent, {
      data: {
        planId: planId,
        cycleValue: cycleValue,
        periodUnit: periodUnit,
      },
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getPlanById(planId);
      }
    });
  }
  editPrice(planId: any, priceId: string) {
    const dialogRef = this.dialog.open(SetPricePopupComponent, {
      data: { planId: planId, priceId: priceId },
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {        
        this.getPlanById(planId);
      }
    });
  }
  addProductDetails(planId: string) {
    const dialogRef = this.dialog.open(ProductDetailsPopupComponent, {
      data: {
        module: 'Plan',
        planId: planId,
      },
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getPlanById(planId);
      }
    });
  }
  editProductDetails(planId:string,productVariantId: string) {
    const dialogRef = this.dialog.open(ProductDetailsPopupComponent, {
      data: {
        module: 'Plan',
        productVariantId: {planId,productVariantId}
      },
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getPlanById(planId);
      }
    });
  }
  editPlansDetails(id: string) {
    this.router.navigate([`/plans/update/${id}`]);
  }
  navigateToGetAllPlans() {
    this.router.navigate(['/plans/']);
  }

  navigateToPlanDetail(id: string) {
    this.router.navigate([`/plans/create/${id}`]);
  }

  sendElementId(planId: string) {
    this.planService.deletePlan(planId).subscribe({
      next: (res) => {
        this.navigateToGetAllPlans();
        this.snackBar.open('Plan deleted successfully', '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
      error: (error: any) => {
        this.snackBar.open(error?.message, '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
    });
  }
  openDeletePlan(id: string) {
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      panelClass: 'dialog-curved',
      data: {
        module: 'Plan',
        deleteId: id,
      },
    });

    this.dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.sendElementId(id);
      }
    });
  }
  editFeatureDetails() {
    this.dialog.open(FeatureDetailsPopupComponent, {
      width: '800px',
    });
  }
  sendproductVariantId(productVariantId: string) {
    this.productDetailService.deleteProductVariant(productVariantId).subscribe({
      next: (res) => {
        this.getPlanById(this.planId);
        this.snackBar.open('productVariant deleted successfully', '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
      error: (error: any) => {
        this.snackBar.open(error?.message, '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
    });
  }
  deleteProductVariantDetails(productVariantId) {
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      panelClass: 'dialog-curved',
      data: {
        module: 'productVariantId',
        deleteId: productVariantId,
      },
    });

    this.dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.sendproductVariantId(productVariantId);
      }
    });
  }
  addOnDetails() {
    this.dialog.open(AddonDetailsPopupComponent, {
      width: '800px',
    });
  }
  addNewCharge() {
    this.dialog.open(NewChargePopupComponent, {
      width: '620px',
    });
  }
}

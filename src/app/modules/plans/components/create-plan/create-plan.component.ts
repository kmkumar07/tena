import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, takeUntil } from 'rxjs';
import { FeatureDetailsPopupComponent } from 'src/app/shared/components/dialog-box/feature-details-popup/feature-details-popup.component';
import { SuccessDialogComponent } from 'src/app/shared/components/dialog-box/success-dialog/success-dialog.component';
import {
  Stepper,
  plan_add_empty_data,
} from 'src/app/shared/constants/consants';
import { PlanService } from '../../services/plan.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  status:boolean;
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
  dialogRef: any;
  public stepOneCompleted: boolean = false;
  editable: boolean = false;
  features: { featureId: string; entitlement: string }[] = [];
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
    private global: GlobalService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
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
    if (this.stepOneCompleted) {
      const pageNumber = 1;
      const limit = 100;
      const search = '';
      this.planService.getPrice(pageNumber, limit, search).subscribe(
        (res) =>
          (this.priceData = res.data.filter((item) => {
            if (item.planId === this.planId) {
              return item;
            }
          }))
      );
    }
  }
  getPlanById(id: string) {
    if (id) {
      this.stepOneCompleted = true;
      this.global.showLoader();
      this.planService
        .getPlanById(id)
        .pipe(takeUntil(this.global.componentDestroyed(this)))
        .subscribe((res) => {
          this.patchValue(res.data);
          this.editable = true;
          
        });
    } else {
      this.stepOneCompleted = false;
      this.editable = false;
    }
  }
  patchValue(data) {
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
            this.openSuccess(plan.planId);
            this.global.hideLoader();
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
  onDelete(id: string) {
    this.planService.deleteProductVariant(id).subscribe(() => {
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
  // editPrice(id){
  //   this.planService.setEditPrice(true);
  //   this.router.navigate([`/plans/create/set-price/${id}`])
  // }
  editProductVariant(id: string) {
    this.router.navigate([`/plans/create/edit-product-detail/${id}`]);
  }
  switchStepper(step: any) {
    const stepId = step.id;
    if (stepId === 1) {
      this.step1.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if (stepId === 2) {
      this.step2.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if (stepId === 3) {
      this.step3.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if (stepId === 4) {
      this.step4.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if (stepId === 5) {
      this.step5.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
    // const element = this.step3.nativeElement;
    // window.scrollTo({
    //   top: element.offsetTop,
    //   behavior: 'smooth'
    // })
  }
  arr = [
    {
      step: 'step1',
      id: 'cdk-step-label-0-0',
      attributeValue: 'false',
    },
    {
      step: 'step2',
      id: 'cdk-step-label-0-1',
      attributeValue: 'false',
    },
    {
      step: 'step3',
      id: 'cdk-step-label-0-2',
      attributeValue: 'false',
    },
    {
      step: 'step4',
      id: 'cdk-step-label-0-3',
      attributeValue: 'false',
    },
    {
      step: 'step5',
      id: 'cdk-step-label-0-4',
      attributeValue: 'false',
    },
  ];
  ngAfterViewInit() {
    // Initialize Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
      let findCurrent = entries.find((ele) => ele.isIntersecting == true);
      if (findCurrent) {
        this.testId = String(findCurrent.target.id);
        this.arr.forEach((ele) => {
          if (ele.step == this.testId) {
            document
              .getElementById(ele.id)
              ?.setAttribute('aria-selected', 'true');
          } else {
            document
              .getElementById(ele.id)
              ?.setAttribute('aria-selected', ele.attributeValue);
          }
        });
      }
    });

    // Start observing the element
    const testArr = [
      this.step1,
      this.step2,
      this.step3,
      this.step4,
      this.step5,
    ];
    testArr.forEach((element: any) => {
      observer.observe(element.nativeElement);
    });
  }

  openSuccess(id) {
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
}

import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { FeatureDetailsPopupComponent } from 'src/app/shared/components/dialog-box/feature-details-popup/feature-details-popup.component';
import {
  Plan,
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
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.scss'],
})
export class PlanDetailsComponent {
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
  search:string;
  planWithTotal:any;
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
  searchQuery: string;
  private searchQueryChanged: Subject<string> = new Subject<string>();
  private searchSubscription: Subscription;
  showLoader = false;
  featureLength: string;
  sortBy: 'externalName' | 'createdOn';
  sortOrder: 'asc' | 'desc';
  planSearchDataLength: boolean = false;
  planSearchData:Plan[];
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
    this.setupSearchSubscription();
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
  onSearchInput() {
    this.searchQueryChanged.next(this.searchQuery);
  }
  private setupSearchSubscription() {
    this.searchSubscription = this.searchQueryChanged
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        this.search = value;
        if (this.search.length > 0) {
          this.showLoader = true;
          this.getSearchPlans(
            this.PageNumber,
            this.limit,
            this.search,
            this.sortBy,
            this.sortOrder
          );
        }
      });
  }


  getSearchPlans(
    PageNumber: number,
    limit: number,
    search: string,
    sortBy: 'externalName' | 'createdOn',
    sortOrder: 'asc' | 'desc'
  ) {
    this.planService
      .getPlans(
        PageNumber,
        limit,
        search,
        sortBy,
        sortOrder
      )
      .subscribe((data) => {
        if (data) {
          this.planWithTotal = data;
          this.planSearchData = this.planWithTotal.data.plans;
          this.planSearchDataLength = false;
          if (this.search.length > 0) {
            this.planSearchData.forEach((plan) => {
              if (this.search === plan.internalName) {
                this.planSearchDataLength = true;                
                return;
              }
            });
            this.showLoader = false;
          }
        }
      });
  }
  
  getPlanById(id: string) {
    if (id) {
      this.stepOneCompleted = true;
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
    this.planForm.controls['internalName'].valueChanges.subscribe((value) => {
      const idValue = value?.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
      this.planForm.controls['planId'].setValue(idValue);
    });
  }

  onSubmit() {
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
            this.router.navigate([`/plans/create/${plan.planId}`]);
            this.snackBar.open('Plan created successfully', '', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['custom-class'],
            });
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
          this.router.navigate([`/plans/create/${plan.planId}`]);
          this.snackBar.open('Plan updated successfully', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          this.global.hideLoader();
        });
    }
  }

  toggleStatus() {
    const currentStatus = this.planForm.get('status').value;
    this.planForm.get('status').setValue(!currentStatus);
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

  editProductVariant(id: string) {
    this.router.navigate([`/plans/create/edit-product-detail/${id}`]);
  }

  removeType(index: any) {
    this.planService.priceModelArr.splice(index, 1);
  }
}

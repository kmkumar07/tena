import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs';
import { Plan } from 'src/app/shared/constants/consants';
import { PlanService } from '../../services/plan.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.scss'],
})
export class PlanDetailsComponent {
  status: boolean;
  priceData: any[] = [];
  search: string;
  planWithTotal: any;
  planForm: FormGroup;
  subscription: Subscription;
  data$ = this.planService.plan$;
  pageNumber: any = '';
  limit: any = '';
  planId: string;
  searchQuery: string;
  private searchQueryChanged: Subject<string> = new Subject<string>();
  private searchSubscription: Subscription;
  showLoader = false;
  sortBy: 'externalName' | 'createdOn';
  sortOrder: 'asc' | 'desc';
  planSearchDataLength: boolean = false;
  planSearchData: Plan[];
  editable: boolean = false;

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
            this.pageNumber,
            this.limit,
            this.search,
            this.sortBy,
            this.sortOrder
          );
        }
      });
  }

  getSearchPlans(
    pageNumber: number,
    limit: number,
    search: string,
    sortBy: 'externalName' | 'createdOn',
    sortOrder: 'asc' | 'desc'
  ) {
    this.planService
      .getPlans(pageNumber, limit, search, sortBy, sortOrder)
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
      this.planService
        .getPlanById(id)
        .pipe(takeUntil(this.global.componentDestroyed(this)))
        .subscribe((res) => {
          this.patchValue(res.data);
          this.editable = true;
        });
    } else {
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
}

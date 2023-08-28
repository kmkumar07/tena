import { Component, ViewChild, OnDestroy } from '@angular/core';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { PlanService } from '../../services/plan.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { DeleteConfirmationComponent } from 'src/app/shared/components/dialog-box/delete-confirmation/delete-confirmation.component';
import { CouponsDeleteSuccessComponent } from 'src/app/shared/components/dialog-box/coupons-delete-success/coupons-delete-success.component';
import { noPlans, plansFields } from 'src/app/shared/constants/consants';

@Component({
  selector: 'app-plans-listing',
  templateUrl: './plans-listing.component.html',
  styleUrls: ['./plans-listing.component.scss'],
})
export class PlansListingComponent implements OnDestroy {
  plansSearchData: any;
  emptyList = noPlans;
  plansData: Array<any> = [];
  planAllData: any;
  totalNumberOfPlan: number;
  plan: Array<any> = [];
  planLength: number;
  totalPages: number = 0;
  hasNextPage: boolean = false;
  totalNumberOfPlanBySearch: number;
  plansearchDataNextPage: boolean = false;
  pageNumber: number = 1;
  NumberOfPage: any = '';
  NumberOfLimit: any = '';
  limit: number = 5;
  search: string = '';
  searchQuery: string = '';
  sortBy: 'externalName' | 'createdOn';
  sortOrder: 'asc' | 'desc';
  allPlansData: number = 0;
  displayedColumns: string[] = [
    'plan_ID',
    'external_name',
    'internal_name',
    'created_at',
    'status',
    'action',
  ];
  private searchQueryChanged: Subject<string> = new Subject<string>();
  private searchSubscription: Subscription;

  selection = new SelectionModel<plansFields>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  dialogRef: any;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private plans: PlanService,
    private global: GlobalService,
    public dialog: MatDialog,
    public router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.sortBy = 'createdOn';
    this.sortOrder = 'desc';
    this.getPlans(
      this.pageNumber,
      this.limit,
      this.search,
      this.sortBy,
      this.sortOrder
    );

    this.searchSubscription = this.searchQueryChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.search = value;
        this.getSearchPlan(
          this.NumberOfPage,
          this.NumberOfLimit,
          this.search,
          this.sortBy,
          this.sortOrder
        );
      });
  }

  onSearchInput() {
    this.searchQueryChanged.next(this.searchQuery);
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  // Fetch plans data
  getPlans(
    pageNumber: number,
    limit: number,
    search: string,
    sortBy: 'externalName' | 'createdOn',
    sortOrder: 'asc' | 'desc'
  ) {
    this.global.showLoader();
    this.plans
      .getPlans(pageNumber, limit, search, sortBy, sortOrder)
      .pipe(takeUntil(this.global.componentDestroyed(this)))
      .subscribe((res) => {
        if (res) {
          this.planAllData = res.data;
          this.plan = this.planAllData.plans;

          console.log(this.plan);
          this.planLength = this.planAllData.totalCount;
          this.plansSearchData = this.planAllData.plans;
          this.global.hideLoader();

          // Calculate pagination details
          this.totalNumberOfPlan = this.planAllData.totalCount;
          this.totalPages = Math.ceil(this.totalNumberOfPlan / limit);
          this.hasNextPage = pageNumber < this.totalPages;
          if (search.length > 0) {
            this.totalNumberOfPlanBySearch = this.planAllData.totalCount;
            this.plansearchDataNextPage =
              this.totalNumberOfPlanBySearch <= limit;
          } else {
            this.plansearchDataNextPage = false;
          }
        } else {
          this.global.hideLoader();
        }
      });
  }

  // Handle sort change
  announceSortChange(sortState: Sort) {
    this.sortBy = sortState.active as 'externalName' | 'createdOn';
    this.sortOrder = sortState.direction as 'asc' | 'desc';
    this.getPlans(
      this.pageNumber,
      this.limit,
      this.search,
      this.sortBy,
      this.sortOrder
    );
  }

  // Handle view plan action
  viewPlanById(id: string) {
    this.router.navigate([`/plans/create/${id}`]);
  }

  // Handle plan deletion
  onDelete(id: string) {
    this.plans.deletePlan(id).subscribe({
      next: (res) => {
        this.deleteSuccess(id);
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

  // Handle delete success
  deleteSuccess(id: string) {
    const dialogRef = this.dialog.open(CouponsDeleteSuccessComponent, {
      width: '422px',
      panelClass: 'dialog-curved',
      data: {
        module: 'Plan',
        deleteId: id,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      if (this.planLength === 0 && this.pageNumber > 1) {
        this.onPrevious();
      }
      this.getPlans(
        this.pageNumber,
        this.limit,
        this.search,
        this.sortBy,
        this.sortOrder
      );
    });
  }

  // Handle delete confirmation dialog
  openDelete(id: string) {
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      panelClass: 'dialog-curved',
      data: {
        module: 'Plan',
        deleteId: id,
      },
    });

    this.dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.onDelete(id);
      }
    });
  }

  // Pagination - Previous page
  onPrevious() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getPlans(
        this.pageNumber,
        this.limit,
        this.search,
        this.sortBy,
        this.sortOrder
      );
    }
  }

  // Pagination - Next page
  onNext() {
    this.pageNumber++;
    this.getPlans(
      this.pageNumber,
      this.limit,
      this.search,
      this.sortBy,
      this.sortOrder
    );
  }

  // Set number of entries per page
  setLimit(event: any) {
    this.limit = event.value;
    this.getPlans(
      this.pageNumber,
      this.limit,
      this.search,
      this.sortBy,
      this.sortOrder
    );
  }

  // Fetch search plan
  getSearchPlan(
    pageNumber: number,
    limit: number,
    search: string,
    sortBy: 'externalName' | 'createdOn',
    sortOrder: 'asc' | 'desc'
  ) {
    this.global.showLoader();
    this.plans
      .getPlans(pageNumber, limit, search, sortBy, sortOrder)
      .pipe(takeUntil(this.global.componentDestroyed(this)))
      .subscribe((data) => {
        if (data) {
          this.planAllData = data;
          this.plan = data.data.plans;
          this.plansSearchData = data.data.plans;
          this.totalNumberOfPlan = data.data.totalCount;
          this.totalPages = Math.ceil(this.totalNumberOfPlan / this.limit);
          this.hasNextPage = this.pageNumber < this.totalPages;
          this.plansearchDataNextPage = this.totalNumberOfPlan <= this.limit;
          this.global.hideLoader();
          if (
            this.totalNumberOfPlan > this.allPlansData ||
            this.totalNumberOfPlan == 0
          ) {
            this.allPlansData = this.totalNumberOfPlan;
          }
        }
      });
  }
}

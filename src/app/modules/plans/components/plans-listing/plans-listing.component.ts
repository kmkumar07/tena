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
import { noPlans, plansFields } from 'src/app/shared/constants/consants';

@Component({
  selector: 'app-plans-listing',
  templateUrl: './plans-listing.component.html',
  styleUrls: ['./plans-listing.component.scss'],
})
export class PlansListingComponent implements OnDestroy {
  plansSearchData: any;
  emptyList = noPlans;
  plansData: any;
  planAllData: any;
  totalNumberOfPlan: number;
  plan: Array<any> = [];
  planLength: number;
  totalPages: number = 0;
  hasNextPage: boolean = false;
  totalNumberOfPlanBySearch: number;
  plansearchDataNextPage: boolean = false;
  pageNumber: number = 1;
  limit: number = 10;
  search: string = '';
  searchQuery: string = '';
  sortBy: 'externalName' | 'createdOn' | 'internalName' | 'planId';
  sortOrder: 'asc' | 'desc';
  allPlansData: number = 0;
  displayedColumns: string[] = [
    'planId',
    'externalName',
    'internalName',
    'createdOn',
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

  onSearchInput() {
    this.pageNumber = 1;
    this.searchQueryChanged.next(this.searchQuery);
  }

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
        this.getPlans(
          this.pageNumber,
          this.limit,
          this.search,
          this.sortBy,
          this.sortOrder
        );
      });
  }

  getPlans(
    pageNumber: number,
    limit: number,
    search: string,
    sortBy: 'externalName' | 'createdOn' | 'internalName' | 'planId',
    sortOrder: 'asc' | 'desc'
  ) {
    this.global.showLoader();

    this.plans
      .getPlans(pageNumber, limit, search, sortBy, sortOrder)
      .pipe(takeUntil(this.global.componentDestroyed(this)))
      .subscribe({
        next: (data) => {
          if (data) {
            this.plansData = data.data;
            this.plansSearchData = this.plansData.plans;

            if (search.length > 0) {
              this.totalNumberOfPlanBySearch = this.plansData.totalCount;
              this.plansearchDataNextPage =
                this.totalNumberOfPlanBySearch <= limit;
            } else {
              this.totalNumberOfPlan = this.plansData.totalCount;
              this.plansearchDataNextPage = false;
              this.totalPages = Math.ceil(this.totalNumberOfPlan / limit);
              this.hasNextPage = pageNumber < this.totalPages;
            }

            this.global.hideLoader();

            if (
              this.totalNumberOfPlan > this.allPlansData ||
              this.totalNumberOfPlan === 0
            ) {
              this.allPlansData = this.totalNumberOfPlan;
            }
          }
        },
        error: (error: any) => {
          this.snackBar.open(error?.message, '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          this.global.hideLoader();
        },
      });
  }

  /**
   * The function `announceSortChange` updates the sorting parameters and retrieves plans based on the
   * new sorting criteria.
   */
  announceSortChange(sortState: Sort) {
    this.sortBy = sortState.active as 'externalName' | 'createdOn' | 'internalName' | 'planId';
    this.sortOrder = sortState.direction as 'asc' | 'desc';
    this.getPlans(
      this.pageNumber,
      this.limit,
      this.search,
      this.sortBy,
      this.sortOrder
    );
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  // Handle view plan action
  viewPlanById(id: string) {
    this.router.navigate([`/plans/create/${id}`]);
  }

  // Handle plan deletion
  onDelete(id: string) {
    this.plans.deletePlan(id).subscribe({
      next: (res) => {
        this.getPlans(
          this.pageNumber,
          this.limit,
          this.search,
          this.sortBy,
          this.sortOrder
        );
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

  openDelete(id: string) {
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      panelClass: 'dialog-curved',
      data: {
        module: 'plan',
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
}

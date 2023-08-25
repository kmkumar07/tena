import { Component, ViewChild } from '@angular/core';
import { noPlans, plansFields } from 'src/app/shared/constants/consants';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { PlanService } from '../../services/plan.service';
import { takeUntil } from 'rxjs';
import { GlobalService } from 'src/app/core/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/shared/components/dialog-box/delete-confirmation/delete-confirmation.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CouponsDeleteSuccessComponent } from 'src/app/shared/components/dialog-box/coupons-delete-success/coupons-delete-success.component';
@Component({
  selector: 'app-plans-listing',
  templateUrl: './plans-listing.component.html',
  styleUrls: ['./plans-listing.component.scss'],
})
export class PlansListingComponent {
  emptyList = noPlans;
  plansData: Array<any>;
  planAllData: any;
  plan: Array<any>;
  planLength: number;
  pageNumber: number = 1;
  limit: number = 5;
  search: string = '';
  displayedColumns: string[] = [
    'plan_ID',
    'external_name',
    'internal_name',
    'created_at',
    'status',
    'action',
  ];
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

  ngOnInit() {
    setTimeout(() => {
      this.getPlans(this.pageNumber, this.limit, this.search);
    });
  }
  getPlans(pageNumber, limit, search) {
    this.global.showLoader();
    this.plans
      .getPlans(pageNumber, limit, search)
      .pipe(takeUntil(this.global.componentDestroyed(this)))
      .subscribe((res) => {
        if (res) {
          this.plansData = res.data;
          this.planAllData = this.plansData;
          this.plan = this.planAllData.plans;
          this.planLength = this.planAllData.totalCount;
          this.global.hideLoader();
        } else {
          this.global.hideLoader();
        }
      });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  viewPlanById(id) {
    this.router.navigate([`/plans/create/${id}`]);
  }

  onDelete(id: any) {
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
    this.getPlans(this.pageNumber, this.limit, this.search);
  }

  deleteSuccess(id: any) {
    const dialogRef = this.dialog.open(CouponsDeleteSuccessComponent, {
      width: '422px',
      panelClass: 'dialog-curved',
      data: {
        module: 'Plan',
        deleteId: id,
      },
    });
    this.plans
      .getPlans(this.pageNumber, this.limit, this.search)
      .subscribe((data) => {
        this.planLength = data['plans'].length;
      });
    dialogRef.afterClosed().subscribe(() => {
      if (this.planLength === 0 && this.pageNumber > 1) {
        this.onPrevious();
      }
      this.getPlans(this.pageNumber, this.limit, this.search);
    });
  }

  openDelete(id: any) {
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

  onPrevious() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getPlans(this.pageNumber, this.limit, this.search);
    }
  }

  onNext() {
    this.pageNumber++;
    this.getPlans(this.pageNumber, this.limit, this.search);
  }

  setLimit(event: any) {
    this.limit = event.value;
    this.getPlans(this.pageNumber, this.limit, this.search);
  }

  searchItem(event: any) {
    const search = event.target.value;
    this.getPlans(this.pageNumber, this.limit, search);
  }
}

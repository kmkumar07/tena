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
@Component({
  selector: 'app-plans-listing',
  templateUrl: './plans-listing.component.html',
  styleUrls: ['./plans-listing.component.scss'],
})
export class PlansListingComponent {
  emptyList = noPlans;
  plansData: Array<any>;
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
    public dialog: MatDialog
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
        if (res.data.length > 0) {
          this.plansData = res.data;
          this.global.hideLoader();
        } else {
          this.global.hideLoader();
        }
      });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  
  onDelete(id) {
    this.plans.deletePlan(id).subscribe((res) => res);
    this.getPlans(this.pageNumber, this.limit, this.search);
  }
  openDelete(id) {
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '420px',
      panelClass: 'dialog-curved',
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
    console.log(search, 'hmmfph');
  }
}

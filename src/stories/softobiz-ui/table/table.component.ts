import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MATERIAL_DATEPICKER_FORMATS } from 'src/app/modules/coupons/components/create-coupons/create-coupons.component';
import { CustomDateHeaderComponent } from 'src/app/shared/components/custom-date-header/custom-date-header.component';
import { DeleteConfirmationComponent } from 'src/app/shared/components/dialog-box/delete-confirmation/delete-confirmation.component';
import {
  Coupon_Data,
  Logs_Data,
  coupon,
  listFilterOptions,
  logs,
  noLogs,
  nocoupons,
} from 'src/app/shared/constants/consants';
// import * as moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
class CustomDateAdapter extends MomentDateAdapter {
  override getDayOfWeekNames(style: 'long' | 'short' | 'narrow') {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }
  override getFirstDayOfWeek(): number {
    return 1;
  }
}

@Component({
  selector: 'sft-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },

    { provide: MAT_DATE_FORMATS, useValue: MATERIAL_DATEPICKER_FORMATS },
  ],
})
export class TableComponent {
  // for checked table
  displayedColumns: string[] = [
    'select',
    'coupon_id',
    'coupon_name',
    'description',
    'created_at',
    'status',
    'action',
  ];
  couponsData: coupon[] = Coupon_Data;
  selection = new SelectionModel<coupon>(true, []);
  emptyCoupons = nocoupons;
  @ViewChild(MatSort) sort: MatSort;
  dialogRef: any;

  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.couponsData.length;
    return numSelected === numRows;
  }
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {}
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    // console.log(this.selection.select)
    this.selection.select(...this.couponsData);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?:coupon): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.coupon_id + 1
    }`;
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
  selectedRow(selectedID: string, event: any) {
    const selectedRow = document.getElementById(`${selectedID}`);
    if (selectedRow != null) {
      selectedRow.classList.toggle('selected-row');
    }
    event.stopPropagation();
  }
  selectAll(data: any[]) {
    if (this.isAllSelected()) {
      data.map((element: any) => {
        document.getElementById(element.id)?.classList.add('selected-row');
      });
    } else {
      data.map((element: any) => {
        document.getElementById(element.id)?.classList.remove('selected-row');
      });
    }
  }
  sendElementId(elementId: string) {
    console.log(elementId);
  }
  openDelete(id: any) {
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '422px',
      panelClass: 'dialog-curved',
    });

    this.dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        console.log(res);

        this.sendElementId(id);
      } else {
        console.log('Delete canceled');
      }
    });
  }

  // for simple table

  isOpened: boolean = false;
  displayedColumns1: string[] = [
    'Timestamp',
    'Events',
    'Customer_Info',
    'Event_Source',
  ];
  LogsData: logs[] = Logs_Data;
  // emptyCoupons = noLogs;
  filterOptions: string[] = listFilterOptions;
  customHeader = CustomDateHeaderComponent;
  startDate: Date;
  endDate: Date;
  preventClose(event: any) {
    event.stopPropagation();
  }
  setFilter(selectedOption: string) {
    console.log(selectedOption, 'this is the selected option');
  }
  openDatePicker(event: MatTabChangeEvent): void {
    const selectedTab = event.index;
    console.log(selectedTab, 'check');
    if (selectedTab === 1) {
      this.isOpened = true;
    }
  }
  handleDateRangeSelection(): void {
    console.log(this.selectedDates, 'test date');
    if (this.selectedDates.length === 2) {
      this.startDate = this.selectedDates[0];
      this.endDate = this.selectedDates[1];
      console.log(this.startDate, 'start date');
      console.log(this.endDate, 'end date');
    }
  }
  get selectedDates(): Date[] {
    return [this.startDate, this.endDate];
  }
}

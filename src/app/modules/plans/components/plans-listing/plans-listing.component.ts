import { Component, ViewChild } from '@angular/core';
import {
  Plans_Data,
  noPlans,
  plansFields,
} from 'src/app/shared/constants/consants';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
@Component({
  selector: 'app-plans-listing',
  templateUrl: './plans-listing.component.html',
  styleUrls: ['./plans-listing.component.scss'],
})
export class PlansListingComponent {
  emptyList = noPlans;
  plansData: plansFields[] = Plans_Data;
  displayedColumns: string[] = [
    'select',
    'plan_ID',
    'external_name',
    'internal_name',
    'description',
    'created_at',
    'status',
    'action',
  ];
  selection = new SelectionModel<plansFields>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.plansData.length;
    return numSelected === numRows;
  }
  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    // console.log(this.selection.select)
    this.selection.select(...this.plansData);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: plansFields): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.plan_ID + 1
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
}

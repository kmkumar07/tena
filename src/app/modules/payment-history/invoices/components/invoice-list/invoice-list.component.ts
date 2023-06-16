import { Component, ViewChild } from '@angular/core';
import { DeleteConfirmationComponent } from 'src/app/shared/components/dialog-box/delete-confirmation/delete-confirmation.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';

import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';


import {
  invoice,
  noInvoice,
  InvoiceList,

} from 'src/app/shared/constants/consants';
@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent {
  noContent =  noInvoice;
  displayedColumns: string[] = [
    'select',
    'id',
    'customer_info',
    'issued_on',
    'voided_on',
    'paid_on',
    'status',
    'amount',
  ];
  InvoiceData: any = InvoiceList;
  selection = new SelectionModel<invoice>(true, []);
  emptyInvoice = noInvoice;
  @ViewChild(MatSort) sort: MatSort;
  dialogRef: any;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.InvoiceData.length;
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
    this.selection.select(...this.InvoiceData);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: invoice): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  // ngAfterViewInit() {
  //   this.featuresData.sort = this.sort;
  // }

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
}

import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FeatureDetailsPopupComponent } from 'src/app/shared/components/dialog-box/feature-details-popup/feature-details-popup.component';
import { plan_add_empty_data } from 'src/app/shared/constants/consants';


export interface PeriodicElement {
  id: string,
  name: string;
  status: string;
  Product: number | string;
  type: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id:'element123456', name: 'Host online calls', status: "Active",Product: 'Microsoft Teams', type: 'Switch' },
  {  id:'element1234', name: 'Union all information', status: "Active",Product: 'Microsoft Teams', type: 'Range' },
  {  id:'element12', name: 'Create team sites', status: "Active",Product: 'Microsoft Teams', type: 'Custom' },
];

@Component({
  selector: 'app-addon-details-popup',
  templateUrl: './addon-details-popup.component.html',
  styleUrls: ['./addon-details-popup.component.scss']
})
export class AddonDetailsPopupComponent {
  planAddEmptyData = plan_add_empty_data;
  constructor(public dialog: MatDialog) {}
  selected = 'option1';
  displayedColumns: string[] = [
    'select',
    'name',
    'status',     
    'Product',
    'type',
  ];
  dataSource: any =  ELEMENT_DATA;
  selection = new SelectionModel<PeriodicElement>(true, []);

  openPopup(){
    this.dialog.open(FeatureDetailsPopupComponent, {
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
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

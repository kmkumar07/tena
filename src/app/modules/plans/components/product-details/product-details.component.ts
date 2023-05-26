import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number | string;
  status: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 'Whiteboard', name: 'Hydrogen', status: "Active", symbol: 'Available' },
  { position: 'Email support', name: 'Custom', status: "Active", symbol: 'Available' },
  { position: 'Whiteboard', name: 'Hydrogen', status: "Active", symbol: 'Available' },
  { position: 'Email support', name: 'Custom', status: "Active", symbol: 'Available' },
  { position: 'Whiteboard', name: 'Hydrogen', status: "Active", symbol: 'Available' },
  { position: 'Email support', name: 'Custom', status: "Active", symbol: 'Available' },
  { position: 'Whiteboard', name: 'Hydrogen', status: "Active", symbol: 'Available' },
  { position: 'Email support', name: 'Custom', status: "Active", symbol: 'Available' },
  { position: 'Whiteboard', name: 'Hydrogen', status: "Active", symbol: 'Available' },
  { position: 'Email support', name: 'Custom', status: "Active", symbol: 'Available' },
];

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  selected = 'option1';
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'status',     
    'symbol',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }
}

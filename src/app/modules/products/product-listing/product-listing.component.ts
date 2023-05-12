import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { Data_Type, User_Data } from 'src/app/shared/constants/consants';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent {
  displayedColumns: string[] = ['select', 'product_ID', 'title', 'description', 'features', 'created_at', 'status', 'action'];
  productsData = User_Data;
  selection = new SelectionModel<Data_Type>(true, []);
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.productsData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.productsData);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Data_Type ): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.product_ID + 1
    }`;
  }
}

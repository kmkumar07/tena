import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ProductsService } from '../../services/products.service';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { Data_Type, noProducts } from 'src/app/shared/constants/consants';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/shared/components/dialog-box/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  loading = false;
  id: string = '';
  displayedColumns: string[] = [
    'productId',
    'name',
    'description',
    'feature',
    'createdOn',
    'status',
    'action',
  ];
  emptyProductPros = noProducts;
  PageNumber = 1;
  limit = 5;
  search: string = '';
  productsData = [];
  filteredProducts: Data_Type[];

  selection = new SelectionModel<Data_Type>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  searchQuery: string;
  private searchQueryChanged: Subject<string> = new Subject<string>();
  private searchSubscription: Subscription;
  dialogRef: any;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.productsData.length;
    return numSelected === numRows;
  }

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    protected productService: ProductsService
  ) {}

  onSearchInput() {
    this.searchQueryChanged.next(this.searchQuery);
  }

  data$ = this.productService.product$;
  ngOnInit(): void {
    this.loading = true;
    this.getProduct(this.PageNumber, this.limit, this.search);
    this.productService.product$.subscribe((data) => {
      if (data) {
        this.productsData = data;
        this.filteredProducts = data;
        this.loading = false;
      }
    });

    this.searchSubscription = this.searchQueryChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.loading = true;
        this.search = value;
        this.getProduct(this.PageNumber, this.limit, this.search);
      });
  }

  getProduct(PageNumber: number, limit: number, search: string) {
    this.loading = true;
    this.productService
      .getProducts(this.PageNumber, this.limit, this.search)
      .subscribe(() => {
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  onPrevious() {
    if (this.PageNumber > 1) {
      this.PageNumber--;
      this.getProduct(this.PageNumber, this.limit, this.search);
    }
  }

  onNext() {
    this.PageNumber++;
    this.getProduct(this.PageNumber, this.limit, this.search);
  }

  sendElementId(elementId: string) {
    this.productService.deleteProduct(elementId).subscribe(() => {
      this.data$.subscribe((data) => {});
    });
  }
  openDelete(id: any) {
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '420px',
      panelClass: 'dialog-curved',
    });

    this.dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.sendElementId(id);
      } 
    });
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
  checkboxLabel(row?: Data_Type): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.product_ID + 1
    }`;
  }

  announceSortChange(sortState: Sort) {
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

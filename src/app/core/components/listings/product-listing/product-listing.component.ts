import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { ProductsService } from '../../../../modules/products/services/products.service';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { Data_Type, noProducts } from 'src/app/shared/constants/consants';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/shared/components/dialog-box/delete-confirmation/delete-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CouponsDeleteSuccessComponent } from 'src/app/shared/components/dialog-box/coupons-delete-success/coupons-delete-success.component';
import { GlobalService } from 'src/app/core/services/global.service';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';

@Component({
  standalone: true,
  imports: [SharedModule, AngularMaterialModule],
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  id: string = '';
  displayedColumns: string[] = [
    'productId',
    'name',
    'feature',
    'createdOn',
    'status',
    'action',
  ];
  getfeaturedata: any;
  productsSearchData: any;
  featureLength: number;
  allProductsData: number = 0;
  emptyProductPros = noProducts;
  PageNumber = 1;
  limit = 3;
  search: string = '';
  sortBy: 'name' | 'createdOn';
  sortOrder: 'asc' | 'desc';
  totalNumberOfProduct: number;
  totalNumberOfProductBySearch: number;
  products: any;
  NoPage: any = '';
  Nolimit: any = '';
  hasNextPage: boolean = false;
  searchDataNextPage: boolean = false;
  totalPages: number = 0;

  selection = new SelectionModel<Data_Type>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  searchQuery: string;
  private searchQueryChanged: Subject<string> = new Subject<string>();
  private searchSubscription: Subscription;
  dialogRef: any;

  constructor(
    public dialog: MatDialog,
    protected productService: ProductsService,
    private snackBar: MatSnackBar,
    private global: GlobalService
  ) {}

  onSearchInput() {
    this.searchQueryChanged.next(this.searchQuery);
  }

  data$ = this.productService.product$;
  ngOnInit() {
    this.sortBy = 'createdOn';
    this.sortOrder = 'desc';

    this.getProduct(
      this.PageNumber,
      this.limit,
      this.search,
      this.sortBy,
      this.sortOrder
    );

    this.searchSubscription = this.searchQueryChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.search = value;
        this.getSearchProduct(
          this.PageNumber,
          this.limit,
          this.search,
          this.sortBy,
          this.sortOrder
        );
      });
  }

  getProduct(
    PageNumber: number,
    limit: number,
    search: string,
    sortBy: 'name' | 'createdOn',
    sortOrder: 'asc' | 'desc'
  ) {
    this.global.showLoader();
    this.productService
      .getProducts(
        this.PageNumber,
        this.limit,
        this.search,
        this.sortBy,
        this.sortOrder
      )
      .subscribe((data) => {
        if (data) {
          this.products = data;
          this.totalNumberOfProduct = this.products.totalCount;
          this.productsSearchData = this.products.products;
          this.global.hideLoader();
          if (
            this.totalNumberOfProduct > this.allProductsData ||
            this.totalNumberOfProduct == 0
          ) {
            this.allProductsData = this.totalNumberOfProduct;
          }

          this.totalPages = Math.ceil(this.totalNumberOfProduct / limit);
          this.hasNextPage = PageNumber < this.totalPages;

          if (this.search.length > 0) {
            this.totalNumberOfProductBySearch = this.products.totalCount;
            this.searchDataNextPage =
              this.totalNumberOfProductBySearch <= limit;
          } else {
            this.totalNumberOfProduct = this.products.totalCount;
            this.searchDataNextPage = false;
          }
        }
      });
  }

  getSearchProduct(
    PageNumber: number,
    limit: number,
    search: string,
    sortBy: 'name' | 'createdOn',
    sortOrder: 'asc' | 'desc'
  ) {
    this.global.showLoader();
    this.productService
      .getProducts(
        this.PageNumber,
        this.limit,
        this.search,
        this.sortBy,
        this.sortOrder
      )
      .subscribe((data) => {
        if (data) {
          this.products = data;
          this.productsSearchData = this.products.products;

          if (this.search.length > 0) {
            this.totalNumberOfProductBySearch = this.products.totalCount;
            this.searchDataNextPage =
              this.totalNumberOfProductBySearch <= limit;
          } else {
            this.totalNumberOfProduct = this.products.totalCount;
            this.searchDataNextPage = false;
            this.totalPages = Math.ceil(this.totalNumberOfProduct / limit);
            this.hasNextPage = PageNumber < this.totalPages;
          }
          this.global.hideLoader();
          if (
            this.totalNumberOfProduct > this.allProductsData ||
            this.totalNumberOfProduct == 0
          ) {
            this.allProductsData = this.totalNumberOfProduct;
          }
        }
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
      this.getProduct(
        this.PageNumber,
        this.limit,
        this.search,
        this.sortBy,
        this.sortOrder
      );
    }
  }

  onNext() {
    this.PageNumber++;
    this.getProduct(
      this.PageNumber,
      this.limit,
      this.search,
      this.sortBy,
      this.sortOrder
    );
  }

  sendElementId(elementId: string) {
    this.productService.deleteProduct(elementId).subscribe({
      next: (res) => {
        this.deleteSuccess(elementId);
      },
      error: (error: any) => {
        this.snackBar.open(error.error.message, '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
    });
  }
  deleteSuccess(id: any) {
    const dialogRef = this.dialog.open(CouponsDeleteSuccessComponent, {
      width: '422px',
      panelClass: 'dialog-curved',
      data: {
        module: 'Product',
        deleteId: id,
      },
    });
    this.getProduct(
      this.PageNumber,
      this.limit,
      this.search,
      this.sortBy,
      this.sortOrder
    );
  }

  openDelete(id: any) {
    for (let i = 0; i < this.productsSearchData.length; i++) {
      if (this.productsSearchData[i].productId === id) {
        this.getfeaturedata = this.productsSearchData[i];
      }
    }

    this.featureLength = this.getfeaturedata.feature.length;
    let productName = this.getfeaturedata.name;
    if (this.featureLength) {
      this.snackBar.open(
        `Unable to delete ${productName}. Please remove associated features first.`,
        '',
        {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        }
      );
    } else {
      this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        width: '420px',
        panelClass: 'dialog-curved',
        data: {
          module: 'Product',
          deleteId: id,
        },
      });

      this.dialogRef.afterClosed().subscribe((res: any) => {
        if (res) {
          this.sendElementId(id);
        }
      });
    }
  }

  announceSortChange(sortState: Sort) {
    this.sortBy = sortState.active as 'name' | 'createdOn';
    this.sortOrder = sortState.direction as 'asc' | 'desc';
    this.getProduct(
      this.PageNumber,
      this.limit,
      this.search,
      this.sortBy,
      this.sortOrder
    );
  }
}

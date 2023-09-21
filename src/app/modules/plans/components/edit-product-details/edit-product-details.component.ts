import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/modules/products/services/products.service';
import { Subscription } from 'rxjs';
import { PlanService } from '../../services/plan.service';
import { SuccessDialogComponent } from 'src/app/shared/components/dialog-box/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsService } from '../../services/product-details.service';

export interface PeriodicElement {
  featureId: string;
  value: string;
  type?: string;
  levels: { featureID: string; value: string }[];
  name: string;
  position: number | string;
  status: string;
  symbol: string;
}

@Component({
  selector: 'app-edit-product-details',
  templateUrl: './edit-product-details.component.html',
  styleUrls: ['./edit-product-details.component.scss'],
})
export class EditProductDetailsComponent implements OnInit {
  selected = 'option1';
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'status',
    'symbol',
  ];
  selection = new SelectionModel<PeriodicElement>(true, []);

  PageNumber: any = '';
  limit: any = '';
  search: string = '';
  sortBy: 'name' | 'createdOn';
  sortOrder: 'asc' | 'desc';
  productData: any = [];
  id: string;
  selectProductId: string = '';
  featureDetails: any = [];
  subscription: Subscription;
  isProductIdSelected: boolean = true;
  selectedProduct: any;
  selectedFeatures: PeriodicElement[] = [];
  isAvailable: boolean = true;

  productForm: FormGroup = this.formBuilder.group({
    productID: ['', Validators.required],
    productName: ['', Validators.required],
    description: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private routes: Router,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private planService: PlanService,
    private productDetailService: ProductDetailsService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productDetailService.getProductVariantById(this.id).subscribe((data) => {
      console.log('a', data);
      this.selectProductId = data.productID;
      this.featureDetails = data.features;

      this.productService
        .getProducts(
          this.PageNumber,
          this.limit,
          this.search,
          this.sortBy,
          this.sortOrder
        )
        .subscribe((data) => {
          this.productData = data;

          const selectedProduct = this.productData.find(
            (product) => product.productId === this.selectProductId
          );
          if (selectedProduct) {
            this.selectProduct(selectedProduct.productId);
          }
        });
    });
  }

  selectProduct(productId: string) {
    this.selectedProduct = this.productData.find(
      (product) => product.productId === productId
    );
    if (this.selectedProduct) {
      this.productForm.patchValue({
        productName: this.selectedProduct.name,
        description: this.selectedProduct.description,
      });
    }
  }

  onSubmit() {
    const productVariant = {
      type: 'base',
      status: 'active',
      features: this.selectedFeatures.map((features) => {
        if (features.type === 'quantity') {
          return {
            featureID: features.featureId,
            value: features.value,
          };
        } else {
          return {
            featureID: features.featureId,
            value: this.isAvailable ? true : false,
          };
        }
      }),
    };

    this.subscription = this.productDetailService
      .updateProductVariant(this.id, productVariant)
      .subscribe({
        next: (res: any) => {
          this.openSuccess();
          this.routes.navigate(['/plans/create']);
          return res;
        },
        error: (err: any) => {
          console.log('something wrong occured', err);
        },
      });
  }

  onDelete() {
    this.routes.navigate(['/plans/create']);
  }

  openSuccess() {
    this.dialog.open(SuccessDialogComponent, {
      width: '420px',
      data: {
        module: 'Product-variant',
        operation: 'is updated',
      },
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.productData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.productData);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }

  toggleCheckbox(row: PeriodicElement) {
    this.selection.toggle(row);
    if (this.selection.isSelected(row)) {
      this.selectedFeatures.push(row);
    } else {
      const index = this.selectedFeatures.findIndex(
        (feature) => feature.featureId === row.featureId
      );
      if (index !== -1) {
        this.selectedFeatures.splice(index, 1);
      }
    }
  }
}

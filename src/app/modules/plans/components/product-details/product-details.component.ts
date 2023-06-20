import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/modules/products/services/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FeatureService } from 'src/app/modules/features/services/feature.service';
import {
  Observable,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs';
import { ProductDetailsService } from '../../services/product-details.service';

export interface PeriodicElement {
  featureId:string;
  value:string
  name: string;
  type?:string;
  levels: {featureID:string, value: string }[];
  position: number | string;
  status: string;
  symbol: string;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {
  subscription: Subscription;
  PageNumber: any = '';
  limit: any = '';
  search: string = '';
  productArray = [];
  productData = [];
  featureValue: any;
  filteredFeatures = [];
  selectedFeatures: PeriodicElement[] = [];
  filteredFeatureId: string = '';
  productVariantFeatureValue = [];
  productId = '';
  isProductSelected: boolean = false;
  isButtonDisabled: boolean = true;
  isAvailable: boolean = true;
  productName$: Observable<string>;
  description$: Observable<string>;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private productDetailsService: ProductDetailsService
  ) {}

  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'status',
    'symbol',
  ];
  selection = new SelectionModel<PeriodicElement>(true, []);

  formGroup = this.formBuilder.group({
    productID: [''],
    productName: [''],
    description: [''],
  });

  ngOnInit() {
    this.getProduct(this.PageNumber, this.limit, this.search);
    this.productService.product$.subscribe((data) => {
      if (data) {
        this.productData = data;
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    console.log("akash", numSelected)
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
      console.log("raw",row)
      this.selectedFeatures.push(row);
    } else {
      const index = this.selectedFeatures.findIndex(
        (feature) => feature.position === row.position
      );
      if (index !== -1) {
        this.selectedFeatures.splice(index, 1);
      }
    }
  }
   

  getProduct(PageNumber: number, limit: number, search: string) {
    this.productService
      .getProducts(this.PageNumber, this.limit, this.search)
      .subscribe(() => {});
  }
  
  selectProduct(product) {
    this.productId = product.productId;
    this.isProductSelected = true;
    this.isButtonDisabled = false;
    this.formGroup.controls.productName.patchValue(product.name);
    this.formGroup.controls.description.patchValue(product.description);
    this.filteredFeatures = product.feature
    console.log("akkk", this.filteredFeatures)
  }
  onSubmit() {
    const formData = this.formGroup.value;
    const productVariantName = formData.productName + ' product Variant';
    const productVariantId = productVariantName
      .replace(/\s+/g, '-')
      .toLowerCase();
    const features = this.selectedFeatures.map((productVariantFeature)=>{
      if (productVariantFeature.type === 'quantity') {
        const values = productVariantFeature.levels.map((level) => level.value).join(', ');
        return {
          featureID: productVariantFeature.featureId,
          value: values
        };
      } else {
        return {
          featureID: productVariantFeature.featureId,
          value: this.isAvailable ? 'true' : 'false'
        };
      }
    })
    const payload = {
      productVariantId: productVariantId,
      name: formData.productName + ' product Variant',
      productID: this.productId,
      type: 'base',
      features: features,
      status: 'active',
    };
    console.log("paylaod",payload)
    this.subscription = this.productDetailsService
      .createProductVariant(payload)
      .subscribe((res) => {
        this.isButtonDisabled = true;
        return res;
      });
  }
}

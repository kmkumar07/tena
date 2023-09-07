import { Component, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductsService } from 'src/app/modules/products/services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ProductDetailsService } from 'src/app/modules/plans/services/product-details.service';
import { Status, selectOptions } from 'src/app/shared/constants/consants';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from 'src/app/core/services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PeriodicElement {
  featureId: string;
  value: string;
  name: string;
  type?: string;
  position: number | string;
  status: string;
  symbol: string;
}

export interface PeriodicElement1 {
  name: string;
  position: number;
  type: string;
  status: string;
  entitlements: string;
}

const ELEMENT_DATA: PeriodicElement1[] = [
  {
    position: 1,
    name: 'Whiteboard',
    status: 'Active',
    type: 'Switch',
    entitlements: '',
  },
  {
    position: 2,
    name: 'Email support',
    status: 'Active',
    type: 'Custom',
    entitlements: '',
  },
  {
    position: 3,
    name: 'API Call',
    status: 'Active',
    type: 'Range',
    entitlements: '',
  },
  {
    position: 4,
    name: 'User License',
    status: 'Active',
    type: 'Quantity',
    entitlements: '',
  },
];
@Component({
  selector: 'app-product-details-popup',
  templateUrl: './product-details-popup.component.html',
  styleUrls: ['./product-details-popup.component.scss'],
})
export class ProductDetailsPopupComponent {
  dropKey: number;
  StatusTypes: selectOptions[] = Status;

  subscription: Subscription;
  PageNumber: any = '';
  limit: any = '';
  search: string = '';
  sortBy: 'name' | 'createdOn';
  sortOrder: 'asc' | 'desc';
  productData = [];
  filteredFeatures = [];
  selectedFeatures: PeriodicElement[] = [];
  productId: string = '';
  planId: string= '';
  isProductSelected: boolean = false;
  isButtonDisabled: boolean = true;
  selectedOption: boolean;
  disabled: boolean;
  isCheckboxChecked: boolean = false;
  selectedLevelFromDropdown: { [key: string]: any } = {};
  clicked = false;
  rangeForm: FormGroup;
  loading = false;
  displayedColumns1: string[] = [
    'select',
    'name',
    'type',
    'status',
    'entitlements',
  ];
  dataSource = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA);
  selection1 = new SelectionModel<PeriodicElement1>(true, []);

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProductDetailsPopupComponent>,

    private productService: ProductsService,
    private productDetailsService: ProductDetailsService,
    private global: GlobalService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: { planId: any }
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
    planID:[''],
    productName: [''],
    description: [''],
    status: [''],
  });

  ngOnInit() {
    this.planId = this.data.planId;
    this.getProduct(this.PageNumber, this.limit, this.search);
    this.productService.product$.subscribe((data) => {
      if (data) {
        this.productData = data.products;
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.productData.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.productData);
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }
  selectedOptions: { [key: string]: boolean } = {};

  toggleCheckbox(event: MatCheckboxChange, row: PeriodicElement) {
    if (event.checked) {
      this.isButtonDisabled = false;
      this.selection.select(row);
      this.selectedFeatures.push(row);
    } else {
      this.selection.deselect(row);
      const index = this.selectedFeatures.findIndex(
        (feature) => feature.featureId === row.featureId
      );
      if (index !== -1) {
        this.selectedFeatures.splice(index, 1);
      }
    }
  }

  onSelectedLevelChange(featureId: string, level: any) {
    this.selectedLevelFromDropdown[featureId] = level;
  }

  getProduct(PageNumber: number, limit: number, search: string) {
    this.productService
      .getProducts(
        this.PageNumber,
        this.limit,
        this.search,
        this.sortBy,
        this.sortOrder
      )
      .subscribe(() => {});
  }

  selectProduct(product: any) {
    this.productId = product.productId;
    this.isProductSelected = true;
    this.formGroup.controls.productName.patchValue(product.name);
    this.formGroup.controls.description.patchValue(product.description);
    this.filteredFeatures = product.feature;
    const rangeFormControls = {};
    this.filteredFeatures.forEach((feature) => {
      const minValue = feature.levels[0]?.value;
      const maxValue = feature.levels[1]?.value;
      if (feature.type === 'range') {
        const rangeValue = [
          '',
          [
            Validators.required,
            Validators.min(Math.min(minValue, maxValue)),
            Validators.max(Math.max(minValue, maxValue)),
          ],
        ];
        rangeFormControls[feature.featureId] = rangeValue;
        feature.minValue = Math.min(minValue, maxValue);
        feature.maxValue = Math.max(minValue, maxValue);
      }
    });

    this.rangeForm = this.formBuilder.group(rangeFormControls);
  }

  onSubmit() {
    this.loading = true;
    const formData = this.formGroup.value;
    const productVariantName = formData.productName + ' product Variant';
    const productVariantId = productVariantName
      .replace(/\s+/g, '-')
      .toLowerCase();

    const features = this.selectedFeatures.map((productVariantFeature) => {
      switch (productVariantFeature.type) {
        case 'quantity':
        case 'custom':
          const values =
            this.selectedLevelFromDropdown[productVariantFeature.featureId];
          return {
            featureID: productVariantFeature.featureId,
            value: values,
          };
        case 'switch':
          return {
            featureID: productVariantFeature.featureId,
            value: this.selectedOptions[productVariantFeature.featureId],
          };
        case 'range':
          return {
            featureID: productVariantFeature.featureId,
            value: this.rangeForm.get(productVariantFeature.featureId).value,
          };
        default:
          return null;
      }
    });

    const payload = {
      productVariantId: productVariantId,
      name: productVariantName,
      planId: this.planId,
      productID: this.productId,
      type: 'base',
      features: features,
      status: 'active',
    };

    this.clicked = false;
    this.subscription = this.productDetailsService
      .createProductVariant(payload)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.isButtonDisabled = true;
          this.selectedFeatures = [];
          this.dialogRef.close(true);
          this.snackBar.open('Product-Varaint created successfully', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          return res;
        },
        error: (err: any) => {
          this.snackBar.open(err.error.message, '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          this.global.hideLoader();
        },
      });
  }
  onCancelClick() {
    this.dialogRef.close(false);
  }
  onDropdownKey(event: number): void {
    this.dropKey = event;
  }
}

import { Component, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductsService } from 'src/app/modules/products/services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, takeUntil } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ProductDetailsService } from 'src/app/modules/plans/services/product-details.service';
import { Status, selectOptions } from 'src/app/shared/constants/consants';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from 'src/app/core/services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanService } from 'src/app/modules/plans/services/plan.service';
import { FormArray } from '@angular/forms';

export interface PeriodicElement {
  featureId: string;
  value: string;
  name: string;
  type?: string;
  position: number | string;
  status: string;
  symbol: string;
}

// export interface PeriodicElement1 {
//   name: string;
//   position: number;
//   type: string;
//   status: string;
//   entitlements: string;
// }

// const ELEMENT_DATA: PeriodicElement1[] = [
//   {
//     position: 1,
//     name: 'Whiteboard',
//     status: 'Active',
//     type: 'Switch',
//     entitlements: '',
//   },
//   {
//     position: 2,
//     name: 'Email support',
//     status: 'Active',
//     type: 'Custom',
//     entitlements: '',
//   },
//   {
//     position: 3,
//     name: 'API Call',
//     status: 'Active',
//     type: 'Range',
//     entitlements: '',
//   },
//   {
//     position: 4,
//     name: 'User License',
//     status: 'Active',
//     type: 'Quantity',
//     entitlements: '',
//   },
// ];
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
  plan: any;
  planId: string = '';
  EditplanId: string;
  productVariantId: string = '';
  productVariantIdWithPlanId: any;
  productVariant: any;
  isProductSelected: boolean = false;
  isButtonDisabled: boolean = true;
  selectedOption: boolean;
  disabled: boolean;
  planArray = [];
  planid: string = '';
  isCheckboxChecked: boolean = false;
  selectedLevelFromDropdown: { [key: string]: any } = {};
  clicked = false;
  rangeForm: FormGroup;
  loading = false;
  updateproductData = [];
  editable: boolean = false;
  flag = false;
  updateproduct = [];

  selectedProductIds: string[] = [];
  displayedColumns1: string[] = [
    'select',
    'name',
    'type',
    'status',
    'entitlements',
  ];
  // dataSource = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  selection1 = new SelectionModel<PeriodicElement>(true, []);

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProductDetailsPopupComponent>,
    private planService: PlanService,
    private productService: ProductsService,
    private productDetailsService: ProductDetailsService,
    private global: GlobalService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: { planId: any; productVariantIdWithPlanId: any }
  ) {}

  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'status',
    'symbol',
  ];

  formGroup = this.formBuilder.group({
    productID: [''],
    planID: [''],
    productName: [''],
    description: [''],
    status: [''],
  });

  ngOnInit() {
    this.planId = this.data.planId;
    this.productVariantIdWithPlanId = this.data;

    this.getProduct(
      this.PageNumber,
      this.limit,
      this.search,
      this.sortBy,
      this.sortOrder
    );

    this.getProductVariantById(this.productVariantIdWithPlanId);
  }
  checkproductAvailabe(products) {
    this.productData = products;
    this.getPlanById(this.planId);
  }
  selectProduct(product: any) {
    // Add the selected product's ID to the list
    this.selectedProductIds.push(product.productId);

    // Now, you can update the form control or perform any other necessary actions
    this.formGroup.get('productID').setValue(product.productId);
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
  getPlanById(id: string) {
    if (this.editable == true) {
      this.planid = this.productVariantIdWithPlanId.productVariantId.planId;
    } else {
      this.planid = id;
    }
    if (this.planid) {
      this.planService
        .getPlanById(this.planid)
        .pipe(takeUntil(this.global.componentDestroyed(this)))
        .subscribe((res) => {
          this.plan = res;

          this.planArray = this.plan.data.productVariant.map(
            (item) => item.name
          );

          const resultArray = this.planArray.map((item) => {
            const splitResult = item.split(`${this.planid}variant`);

            return splitResult.length > 1 ? splitResult[1] : splitResult[0];
          });
          this.updateproductData = this.productData.filter(
            (product) => !resultArray.includes(product.productId)
          );
        });
    }
  }
  getProductVariantById(id: any) {
    if (id.productVariantId) {
      this.productVariantId = id.productVariantId.productVariantId;
    }
    if (this.productVariantId) {
      this.productDetailsService
        .getProductVariantById(this.productVariantId)
        .pipe(takeUntil(this.global.componentDestroyed(this)))
        .subscribe((res) => {
          this.patchValue(res);
        });
    }
  }
  patchValue(res: any) {
    this.editable = true;
    this.filteredFeatures = res.data.features;

    const rangeFormControls = {};
    this.filteredFeatures.forEach((feature) => {
      if (feature.type === 'range') {
        const rangeValue = [''];
        rangeFormControls[feature.featureId] = rangeValue;
      }
    });

    this.rangeForm = this.formBuilder.group(rangeFormControls);
    this.productVariantId = res.data.productVariantId;

    this.formGroup.patchValue({
      productName: res.data.name,
      productID: res.data.productID,
      status: res.data.status,
      planID: res.data.planID,
    });
    this.filteredFeatures = res.data.features;
    this.EditplanId = this.productVariantIdWithPlanId.productVariantId.planId;
    this.getPlanById(this.EditplanId);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.filteredFeatures.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      // this.isCheckboxChecked=true
      this.selection.select(...this.filteredFeatures);
    }
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

  getProduct(
    PageNumber: number,
    limit: number,
    search: string,
    sortBy: 'name' | 'createdOn',
    sortOrder: 'asc' | 'desc'
  ) {
    this.global.showLoader();
    this.productService
      .getProducts(PageNumber, limit, search, sortBy, sortOrder)
      .subscribe({
        next: (res) => {
          if (res) {
            const products = res.data;
            this.productData = products.products;
            this.checkproductAvailabe(this.productData);

            this.global.hideLoader();
          }
        },
        error: (error: any) => {
          this.snackBar.open(error?.message, '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          this.global.hideLoader();
        },
      });
  }

  onSubmit() {
    this.loading = true;
    const formData = this.formGroup.value;

    const productVariantName = this.planId + 'variant' + formData.productName;

    const productVariantId = productVariantName
      .replace(/\s+/g, '-')
      .toLowerCase();
    const editProductVariantName =
      this.EditplanId + 'variant' + formData.productName;

    const editProductVariantId = editProductVariantName
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

    const productVariant = {
      productVariantId: productVariantId,
      name: productVariantName,
      planId: this.planId,
      productID: this.productId,
      type: 'base',
      features: features,
      status: 'active',
    };

    this.clicked = false;
    if (this.editable == false) {
      this.subscription = this.productDetailsService
        .createProductVariant(productVariant)
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
    } else {
      const UpdateproductVariant = {
        productVariantId: editProductVariantId,
        name: editProductVariantName,
        planId: this.EditplanId,
        productID: this.productId,
        type: 'base',
        features: features,
        status: 'active',
      };
      this.global.showLoader();

      this.productDetailsService
        .updateProductVariant(this.productVariantId, UpdateproductVariant)
        .pipe(takeUntil(this.global.componentDestroyed(this)))
        .subscribe({
          next: (res) => {
            this.snackBar.open('Product-Varaint updated successfully', '', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
            this.dialogRef.close(true);
            this.global.hideLoader();
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
  }
  onCancelClick() {
    this.dialogRef.close(false);
  }
  onDropdownKey(event: number): void {
    this.dropKey = event;
  }
}

import { Component, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
  Data_Type,
  User_Data,
  feature_types,
} from 'src/app/shared/constants/consants';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import getUniqueId from 'src/app/core/utils/functions/getUniqueId';
import { FeatureService } from '../../services/feature.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { ProductsService } from 'src/app/modules/products/services/products.service';
import { SuccessDialogComponent } from 'src/app/shared/components/dialog-box/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface menuOptions {
  value: number;
  title: string;
}

@Component({
  selector: 'app-create-feature',
  templateUrl: './create-feature.component.html',
  styleUrls: ['./create-feature.component.scss'],
})
export class CreateFeatureComponent {
  productName: Data_Type[] = User_Data;
  featureType: menuOptions[] = feature_types;
  subscription: Subscription;
  isUnlimited: boolean = false;
  preName: string = '';
  postName: string = '';
  position: any;
  unlimitedButtonLabel: string = 'Set Unlimited';
  PageNumber: any = '';
  limit: any = '';
  search: string = '';
  sortBy: 'name' | 'createdOn';
  sortOrder: 'asc' | 'desc';
  productArray = [];
  id: string;
  product: any;
  isRangeSelected: boolean = false;
   displayName: string;
  filteredProducts: Observable<any[]>;
  
  public featureForm: FormGroup | null;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private formBuilder: FormBuilder,
    private featureService: FeatureService,
    private routes: Router,
    private productService: ProductsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.productService
      .getProducts(
        this.PageNumber,
        this.limit,
        this.search,
        this.sortBy,
        this.sortOrder
      )
      .subscribe((data) => {
        this.product = data;
        this.productArray = this.product.products.map((res) => res.productId);
        this.featureForm.patchValue({ productID: this.id });
        this.filteredProducts = this.featureForm
          .get('productID')!
          .valueChanges.pipe(
            startWith(''),
            map((value) => this.filterProducts(value || ''))
          );
      });
    this.feature();
    this.featureForm.controls['name'].valueChanges.subscribe((value) => {
      const idValue = value?.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
      this.featureForm.controls['featureId'].setValue(idValue);
    });
  }

  filterProducts(value: string) {
    const filterValue = value.toLowerCase();
    const filteredProducts = this.productArray.filter((product) =>
      product.toLowerCase().includes(filterValue)
    );
    return filteredProducts;
  }

  feature() {
    this.featureForm = this.formBuilder.group({
      featureId: ['', Validators.required],
      productID: ['', Validators.required],
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9\s]*$/),
        ],
      ],
      description: ['', Validators.maxLength(500)],
      type: ['', Validators.required],
      unit: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/), Validators.maxLength(50)]],
      status: [true],
      levels: this.formBuilder.array([
        this.formBuilder.group({
          isUnlimited: [false],
          value: ['', Validators.required],
          name: ['', Validators.required],
        }),
        this.formBuilder.group({
          isUnlimited: [false],
          value: ['', Validators.required],
          name: ['', Validators.required],
        }),
      ]),
    });
  }

  get levels() {
    return this.featureForm.controls['levels'] as FormArray;
  }
  getLevelList(index: number) {
    const levelList = this.levels.at(index) as FormGroup;
    return levelList;
  }
  addLevels() {
    if (this.isUnlimited) {
      this.position = this.levels.controls.length - 1;
      this.levels.insert(
        this.position,
        this.formBuilder.group({
          isUnlimited: [false],
          value: ['', Validators.required],
          name: ['', Validators.required],
        })
      );
    } else {
      this.position = this.levels.controls.length + 1;
      this.levels.insert(
        this.position,
        this.formBuilder.group({
          isUnlimited: [false],
          value: ['', Validators.required],
          name: ['', Validators.required],
        })
      );
    }
  }

  deleteLevels(levelIndex: number) {
    this.levels.removeAt(levelIndex);
  }
  toggleUnlimited() {
    this.position = this.levels.controls.length - 1;
    const lastLevel = this.getLevelList(this.position);
    this.postName = this.featureForm.value.unit;
    if (this.isUnlimited) {
      lastLevel.patchValue({
        isUnlimited: false,
        value: '',
        name: '',
      });
      this.unlimitedButtonLabel = 'Set Unlimited';
    } else {
      if (!this.postName) {
        lastLevel.patchValue({
          isUnlimited: true,
          value: 'unlimited',
          name: 'unlimited',
        });
        this.unlimitedButtonLabel = 'Set Custom Maximum';
      } else {
        lastLevel.patchValue({
          isUnlimited: true,
          value: 'unlimited',
          name: 'unlimited' + ' ' + this.postName + 's',
        });
        this.unlimitedButtonLabel = 'Set Custom Maximum';
      }
    }
    this.isUnlimited = !this.isUnlimited;
  }

  setName(index: number) {
    this.postName = this.featureForm.value.unit;

    this.preName = this.featureForm.value.levels[index].value;

    if (this.postName.length > 0 && this.preName.length > 0) {
      this.displayName = this.preName + ' ' + this.postName + 's';
    }
    const currentIndex = this.getLevelList(index);
    currentIndex.patchValue({
      name: this.displayName,
    });
    this.featureForm.get('levels.' + index + '.value').markAsTouched();
  }
  onTypeSelection(value: string) {
    // if (value === 'switch') {
    //   this.featureForm.controls['unit'].reset();

    // }
    if (value === 'range') {
      this.isRangeSelected = true;
      this.featureForm.controls['unit'].reset();
      while (this.levels.length > 2) {
        this.levels.removeAt(2); // Remove form groups starting from index 2
      }
      for (let i = 0; i < this.levels.length; i++) {
        const formGroup = this.levels.at(i); // Get the specific form group
        formGroup.patchValue({
          value: '',
          name: '',
        });
      }
    } else if (value === 'quantity' || value === 'custom') {
      this.isRangeSelected = false;
      this.featureForm.controls['unit'].reset();

      for (let i = 0; i < this.levels.length; i++) {
        const formGroup = this.levels.at(i); // Get the specific form group
        formGroup.patchValue({
          value: '',
          name: '',
        });
      }
    } else if (value === 'switch') {
      this.isRangeSelected = false;
      this.featureForm.controls['unit'].reset();
    } else {
      this.isRangeSelected = false;
    }
  }
 
  onSubmit() {
    this.levels.controls.forEach((ele, index) => {
      if (!ele.get('level')) {
        (<FormGroup>ele).addControl('level', new FormControl(index));
      } else {
        ele.get('level').setValue(index);
      }
    });

    const status = this.featureForm.value.status ? 'active' : 'draft';
    let feature: any = {
      featureId: this.featureForm.value.featureId,
      productID: this.featureForm.value.productID,
      name: this.featureForm.value.name,
      description: this.featureForm.value.description,
      type: this.featureForm.value.type,
      status: status,
      levels: [],
    };
    if (this.featureForm.value.type === 'quantity') {
      feature = {
        ...feature,
        unit: this.featureForm.value.unit,
        levels: this.featureForm.value.levels,
      };
    } else if (this.featureForm.value.type === 'custom') {
      const levels = this.featureForm.value.levels.map((level: any) => {
        return {
          ...level,
          isUnlimited: ' ',
        };
      });
      feature = {
        ...feature,
        levels: levels,
      };
    }

    if (this.featureForm.value.type === 'range') {
      feature = {
        ...feature,
        unit: this.featureForm.value.unit,
        levels: this.featureForm.value.levels,
      };
    }

    this.subscription = this.featureService.addFeature(feature).subscribe({
      next: (res: any) => {
        this.openSuccess();
        this.routes.navigate([`/features/view/${res.featureId}`]);
        return res;
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

  onDelete() {
    this.routes.navigate(['/features']);
  }

  openSuccess() {
    this.dialog.open(SuccessDialogComponent, {
      width: '420px',
      data: {
        module: 'Feature',
        operation: 'is created',
      },
    });
  }
  switchSample() {
    console.log('switch feature is clicked');
    this.featureForm.removeControl('unit');
    this.isRangeSelected = false;
    console.log('switch', this.featureForm.value);
    this.featureForm.patchValue({
      productID: this.productArray[0],
      name: 'Whiteboard',
      description: ` This feature type has 2 entitlement levels- "available" and "notavailable"`,
      type: 'switch',
      status: [true],
    });
  }

  rangeSample() {
    this.featureForm.addControl(
      'unit',
      this.formBuilder.control('', Validators.required)
    );
    this.isRangeSelected = true;
    this.featureForm.patchValue({
      productID: this.productArray[0],
      name: 'API Call',
      description: `This feature supports range based entitlements. For eg : Customer’s
          access can be between 100 and 300 API / minute`,
      type: 'range',
      status: [true],
      unit: 'License',
    });
    const values = [
      { value: '10', name: 'License' },
      { value: '20', name: 'License' },
    ];

    for (let i = 0; i < 2; i++) {
      const formGroup = this.levels.at(i);
      formGroup?.patchValue(values[i]);
    }
  }
  quantitySample() {
    this.featureForm.addControl(
      'unit',
      this.formBuilder.control('', Validators.required)
    );
    this.isRangeSelected = false;
    this.featureForm.patchValue({
      productID: this.productArray[0],
      name: 'API Call',
      description: ` This feature type has numbered entitlement levels- For eg : 2,3,4 or
          10 user licenses.`,
      type: 'quantity',
      status: [true],
      unit: 'License',
    });
    const values = [
      { value: '3', name: 'License' },
      { value: '10', name: 'License' },
      { value: '20', name: 'License' },
    ];

    for (let i = 0; i < 3; i++) {
      const formGroup = this.levels.at(i);
      formGroup?.patchValue(values[i]);
    }
  }
  customSample() {
    this.featureForm.addControl(
      'unit',
      this.formBuilder.control('', Validators.required)
    );
    this.isRangeSelected = false;
    this.featureForm.patchValue({
      productID: this.productArray[0],
      name: 'Email Support',
      description: ` This feature supports range based entitlements. For eg : Customer’s
          access can be between 100 and 300 API / minute`,
      type: 'custom',
      status: [true],
    });
    const values = [
      { value: '12', name: 'Working hours' },
      { value: '24', name: 'Weekdays' },
      { value: '20', name: 'Month' },
    ];

    for (let i = 0; i < 3; i++) {
      const formGroup = this.levels.at(i);
      formGroup?.patchValue(values[i]);
    }
  }
}

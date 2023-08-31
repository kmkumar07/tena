import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { ProductsService } from 'src/app/modules/products/services/products.service';
import { SuccessDialogComponent } from 'src/app/shared/components/dialog-box/success-dialog/success-dialog.component';
import { feature_types } from 'src/app/shared/constants/consants';
import { FeatureService } from '../../services/feature.service';

export interface menuOptions {
  value: number;
  title: string;
}

@Component({
  selector: 'app-edit-feature',
  templateUrl: './edit-feature.component.html',
  styleUrls: ['./edit-feature.component.scss'],
})
export class EditFeatureComponent {
  featureType: menuOptions[] = feature_types;
  subscription: Subscription;
  isUnlimited: boolean = false;
  preName: string = '';
  postName: string = '';
  position: any;
  isRangeSelected: boolean = false;
  product: any;
  unlimitedButtonLabel: string = 'Set Unlimited';
  PageNumber: any = '';
  limit: any = '';
  search: string = '';
  sortBy: 'name' | 'createdOn';
  sortOrder: 'asc' | 'desc';
  productId = [];
  status: boolean;
  filteredProducts: Observable<any[]>;
  unlimitedValue: any;
  featureForm: FormGroup = this.formBuilder.group({
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
    unit: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
    status: [false],
    levels: this.formBuilder.array([
      this.formBuilder.group({
        isUnlimited: [false],
        value: ['', [Validators.required]],
        name: ['', Validators.required],
      }),
      this.formBuilder.group({
        isUnlimited: [false],
        value: ['', [Validators.required]],
        name: ['', Validators.required],
      }),
    ]),
  });

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private formBuilder: FormBuilder,
    private featureService: FeatureService,
    private routes: Router,
    private route: ActivatedRoute,
    private productService: ProductsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
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
        this.productId = this.product.products.map((res) => res.productId);
        this.filteredProducts = this.featureForm
          .get('productID')!
          .valueChanges.pipe(
            startWith(''),
            map((value) => this.filterProducts(value || ''))
          );
      });
    const id = this.route.snapshot.params['id'];

    this.featureService.getFeatureById(id).subscribe((data) => {
      this.updateForm(data);
      if (data.data.status === 'draft') {
        this.featureForm.get('status').setValue(false);
      }
    });
  }

  filterProducts(value: string) {
    const filterValue = value.toLowerCase();
    const filteredProducts = this.productId.filter((product) =>
      product.toLowerCase().includes(filterValue)
    );
    return filteredProducts;
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
          name: 'unlimited' + ' ' + this.postName,
        });
      }

      this.unlimitedButtonLabel = 'Set Custom Maximum';
    }
    this.isUnlimited = !this.isUnlimited;
  }

  setName(index: number) {
    this.postName = this.featureForm.value.unit;
    this.preName = this.featureForm.value.levels[index].value;
    const displayName = this.preName + ' ' + this.postName + 's';
    const currentIndex = this.getLevelList(index);
    currentIndex.patchValue({
      name: displayName,
    });
    this.featureForm.get('levels.' + index + '.value').markAsTouched();
  }

  onTypeSelection(value: string) {
    if (value === 'switch') {
      this.featureForm.removeControl('unit');
    }
    if (value === 'range') {
      this.featureForm.addControl(
        'unit',
        this.formBuilder.control(null, Validators.required)
      );
      this.isRangeSelected = true;
      let i = 0;
      if (this.levels.length == 0) {
        while (i < 2) {
          this.addLevels();
          i++;
        }
      }
      while (this.levels.length > 2) {
        this.levels.removeAt(2);
      }
    }
    if (value === 'quantity' || value === 'custom') {
      this.isRangeSelected = false;
      this.featureForm.addControl(
        'unit',
        this.formBuilder.control(null, Validators.required)
      );

      let i = 0;
      if (this.levels.length == 0) {
        while (i < 2) {
          this.addLevels();
          i++;
        }
      }
    }
  }
  toggleStatus() {
    const currentStatus = this.featureForm.get('status').value;
    this.featureForm.get('status').setValue(!currentStatus);
  }
  updateForm(res: any) {
    const resData=res.data
    if (resData.type === 'range') {
      this.isRangeSelected = true;
    }
    this.featureForm.patchValue({
      featureId: resData.featureId,
      productID: resData.product.productId,
      name: resData.name,
      description: resData.description,
      type: resData.type,
      status: resData.status,
      unit: resData.unit,
      levels: resData.levels,
    });
    if (Array.isArray(res.levels) && res.levels.length >= 0) {
      const levelsControl = this.featureForm.get('levels') as FormArray;
      levelsControl.clear();

      res.levels.forEach((level: any, index: number) => {
        const levelGroup = this.formBuilder.group({
          isUnlimited: [level.isUnlimited],
          level: [level.level],
          name: [level.name],
          value: [level.value],
        });

        levelsControl.push(levelGroup);
        if (index === res.levels.length - 1) {
          this.unlimitedValue = level.value;
        }
      });
    }
    if (this.unlimitedValue === 'unlimited') {
      this.unlimitedButtonLabel = 'Set Custom Maximum';
    } else {
      this.unlimitedButtonLabel = 'Set Unlimited';
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
    switch (this.featureForm.value.type) {
      case 'quantity':
      case 'range':
        feature = {
          ...feature,
          unit: this.featureForm.value.unit,
          levels: this.featureForm.value.levels,
        };
        break;

      case 'custom':
        const levels = this.featureForm.value.levels.map((level: any) => ({
          ...level,
          isUnlimited: '',
        }));

        feature = {
          ...feature,
          unit: this.featureForm.value.unit,
          levels: levels,
        };
        break;
    }

    this.subscription = this.featureService
      .updateFeature(this.featureForm.value.featureId, feature)
      .subscribe({
        next: (res: any) => {
          this.openSuccess();
          this.routes.navigate([`/features/view/${res.data.featureId}`]);
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
        operation: 'is updated',
      },
    });
  }

  // sample data code
  switchSample() {
    console.log('switch feature is clicked');
    this.featureForm.removeControl('unit');
    this.isRangeSelected = false;
    this.featureForm.patchValue({
      productID: this.filterProducts[0],
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
      productID: this.filterProducts[0],
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
      productID: this.filterProducts[0],
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
      productID: this.filterProducts[0],
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

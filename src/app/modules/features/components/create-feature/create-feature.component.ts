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
import { FeatureService } from '../../services/feature.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  Subject,
  Subscription,
} from 'rxjs';
import { ProductsService } from 'src/app/modules/products/services/products.service';
import { SuccessDialogComponent } from 'src/app/shared/components/dialog-box/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/core/services/global.service';
import { featureSamples } from 'src/app/shared/constants/static-info';

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
  featureSamples = featureSamples;
  productName: Data_Type[] = User_Data;
  featureType: menuOptions[] = feature_types;
  subscription: Subscription;
  isUnlimited: boolean = false;
  preName: string = '';
  postName: string = '';
  position: any;
  validateUnit: boolean = false;
  validateUnitValue: boolean = false;
  unlimitedButtonLabel: string = 'Set Unlimited';
  PageNumber: any = '';
  limit: any = '';
  search: string = '';
  sortBy: 'name' | 'createdOn';
  sortOrder: 'asc' | 'desc';
  productArray = [];
  id: string;
  product: any;
  showLoader = false;
  isRangeSelected: boolean = false;
  displayName: string;
  filteredProducts: Observable<any[]>;
  private searchQueryChanged: Subject<string> = new Subject<string>();
  private searchSubscription: Subscription;
  searchQuery: string;
  featureName = [];
  featuresSearchDataLength: boolean;
  public featureForm: FormGroup | null;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private formBuilder: FormBuilder,
    private featureService: FeatureService,
    private routes: Router,
    private global: GlobalService,
    private productService: ProductsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  onSearchInput() {
    this.searchQueryChanged.next(this.searchQuery);
  }
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
      .subscribe((res) => {
        let feature = [];
        this.product =res.data;
        this.productArray = this.product.products.map((res) => res.productId);
        feature = this.product.products.map((res) => res.feature);
        const flattenedArray = [].concat(...feature);
        this.featureName = flattenedArray.map((res) => res.name);
        this.featureForm.patchValue({ productID: this.id });
        this.filteredProducts = this.featureForm
          .get('productID')!
          .valueChanges.pipe(
            startWith(''),
            map((value) => this.filterProducts(value || ''))
          );
      });
    this.searchSubscription = this.searchQueryChanged
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((value) => {
        this.search = value;
        if (this.search.length > 0) {
          this.showLoader = true;
          this.getSearchFeature(this.search);
        }
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
  getSearchFeature(search: string) {
    this.featuresSearchDataLength = false;
    if (this.search.length > 0) {
      this.featureName.forEach((name) => {
        if (search === name) {
          this.featuresSearchDataLength = true;
          return;
        }
      });
      this.showLoader = false;
    }
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
      unit: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\s]*$/),
          Validators.maxLength(50),
        ],
      ],
      status: [false],
      levels: this.formBuilder.array([
        this.formBuilder.group({
          isUnlimited: [false],
          value: [
            '',
            [
              Validators.required,
              Validators.pattern(/^[a-zA-Z0-9\s]*$/),
              Validators.maxLength(50),
            ],
          ],
          name: [
            '',
            [
              Validators.required,
              Validators.pattern(/^[a-zA-Z0-9\s]*$/),
              Validators.maxLength(50),
            ],
          ],
        }),
        this.formBuilder.group({
          isUnlimited: [false],
          value: [
            '',
            [
              Validators.required,
              Validators.pattern(/^[a-zA-Z0-9\s]*$/),
              Validators.maxLength(50),
            ],
          ],
          name: [
            '',
            [
              Validators.required,
              Validators.pattern(/^[a-zA-Z0-9\s]*$/),
              Validators.maxLength(50),
            ],
          ],
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
          value: [
            '',
            [
              Validators.required,
              Validators.pattern(/^[a-zA-Z0-9\s]*$/),
              Validators.maxLength(50),
            ],
          ],
          name: [
            '',
            [
              Validators.required,
              Validators.pattern(/^[a-zA-Z0-9\s]*$/),
              Validators.maxLength(50),
            ],
          ],
        })
      );
    } else {
      this.position = this.levels.controls.length + 1;
      this.levels.insert(
        this.position,
        this.formBuilder.group({
          isUnlimited: [false],
          value: [
            '',
            [
              Validators.required,
              Validators.pattern(/^[a-zA-Z0-9\s]*$/),
              Validators.maxLength(50),
            ],
          ],
          name: [
            '',
            [
              Validators.required,
              Validators.pattern(/^[a-zA-Z0-9\s]*$/),
              Validators.maxLength(50),
            ],
          ],
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
      lastLevel.get('value').enable();
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
        lastLevel.get('value').disable();
        this.unlimitedButtonLabel = 'Set Custom Maximum';
      }
    }
    this.isUnlimited = !this.isUnlimited;
  }

  setName(index: number) {
    this.postName = this.featureForm.value.unit;
    this.preName = this.featureForm.value.levels[index].value;
    this.validateUnitValue = false;
    if (this.preName.length > 50) {
      this.validateUnitValue = true;
    }
    if (this.preName.length > 0) {
      if (this.postName === null) {
        this.displayName = this.preName;
      } else {
        this.displayName = this.preName + ' ' + this.postName + 's';
      }
    }
    const currentIndex = this.getLevelList(index);
    currentIndex.patchValue({
      name: this.displayName,
    });
    this.featureForm.get('levels.' + index + '.value').markAsTouched();
  }
  updateDisplayName(preName: string, postName: string): string {
    if (preName.length > 0 && postName.length > 0) {
      return preName + ' ' + postName + 's';
    }
    return '';
  }

  setNameUnit() {
    const unitValue = this.featureForm.value.unit;
    this.validateUnit = false;
    if (unitValue.length > 50) {
      this.validateUnit = true;
    }
    const levels = this.featureForm.get('levels');

    levels.value.forEach((level: any, index: number) => {
      const displayName = this.updateDisplayName(level.value, unitValue);
      const currentIndex = this.getLevelList(index);
      currentIndex.patchValue({
        name: displayName,
      });
    });
  }

  onTypeSelection(value: string) {
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
  toggleStatus() {
    const currentStatus = this.featureForm.get('status').value;
    console.log(currentStatus);

    this.featureForm.get('status').setValue(!currentStatus);
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
          levels: this.featureForm.getRawValue().levels,
        };
        break;

      case 'custom':
        const levels = this.featureForm.value.levels.map((level: any) => ({
          ...level,
          isUnlimited: false,
        }));
        feature = {
          ...feature,
          unit: this.featureForm.value.unit,
          levels: levels,
        };
        break;
    }

    this.subscription = this.featureService.addFeature(feature).subscribe({
      next: (res: any) => {
        this.openCustomSnackbar('Feature created successfully')
        this.routes.navigate([`/features/view/${res.data.featureId}`]);
        return res;
      },
      error: (error: any) => {
        this.openCustomSnackbar(error.error.message)
      },
    });
  }
  openCustomSnackbar(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['custom-class'],
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
  // sample data code
  setFeature(featureData) {
    this.featureForm.addControl(
      'unit',
      this.formBuilder.control('', Validators.required)
    );

    this.isRangeSelected = featureData.type === 'range';

    this.featureForm.patchValue({
      productID: this.productArray[0],
      name: featureData.name,
      description: featureData.description,
      type: featureData.type,
      status: [true],
      unit: featureData.unit || '',
    });

    if (featureData.levels) {
      for (let i = 0; i < featureData.levels.length; i++) {
        const formGroup = this.levels.at(i);
        formGroup?.patchValue(featureData.levels[i]);
      }
    }
  }
}

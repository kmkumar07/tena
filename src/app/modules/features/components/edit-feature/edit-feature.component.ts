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
import { feature_types } from 'src/app/shared/constants/consants';
import { FeatureService } from '../../services/feature.service';
import { featureSamples } from 'src/app/shared/constants/static-info';

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
  featureSamples = featureSamples;
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
  showLoader = false;
  sortBy: 'name' | 'createdOn';
  sortOrder: 'asc' | 'desc';
  productId = [];
  featureName = [];
  featuresSearchDataLength: boolean;
  private searchQueryChanged: Subject<string> = new Subject<string>();
  private searchSubscription: Subscription;
  searchQuery: string;
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
    levels: this.formBuilder.array([]),
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
      .subscribe((res) => {
        this.product = res.data;
        let feature = [];
        this.productId = this.product.products.map((res) => res.productId);
        feature = this.product.products.map((res) => res.feature);
        const flattenedArray = [].concat(...feature);
        this.featureName = flattenedArray.map((res) => res.name);
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
    this.searchSubscription = this.searchQueryChanged
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((value) => {
        this.search = value;
        if (this.search.length > 0) {
          this.showLoader = true;
          this.getSearchFeature(this.search);
        }
      });
  }
  onSearchInput() {
    this.searchQueryChanged.next(this.searchQuery);
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
    const resData = res.data;
    if (resData.type === 'range') {
      this.isRangeSelected = true;
    }
    resData.levels.forEach(() => {
      (this.featureForm.get("levels") as FormArray).push(this.formBuilder.group({
        isUnlimited: [false],
        value: ['', [Validators.required]],
        name: ['', Validators.required],
      }))
    });
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
    this.featureForm.get('productID')?.disable();

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
          isUnlimited: false,
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
          this.openCustomSnackbar('Feature updated successfully');
          this.routes.navigate([`/features/view/${res.data.featureId}`]);
          return res;
        },
        error: (error: any) => {
          this.openCustomSnackbar(error.error.message);
        },
      });
  }

  onDelete() {
    this.routes.navigate(['/features']);
  }
  openCustomSnackbar(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['custom-class'],
    });
  }

  // sample data code
  setSampleFeature(featureData) {
    this.featureForm.addControl(
      'unit',
      this.formBuilder.control('', Validators.required)
    );

    this.isRangeSelected = featureData.type === 'range';
    this.featureForm.patchValue({
      productID: this.featureForm.getRawValue().productID,
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

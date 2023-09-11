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
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/modules/products/services/products.service';
import { SuccessDialogComponent } from 'src/app/shared/components/dialog-box/success-dialog/success-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeatureService } from 'src/app/modules/features/services/feature.service';
import { Inject } from '@angular/core';

export interface menuOptions {
  value: number;
  title: string;
}

@Component({
  selector: 'app-features-popup',
  templateUrl: './features-popup.component.html',
  styleUrls: ['./features-popup.component.scss'],
})
export class FeaturesPopupComponent {
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
  status: boolean;
  search: string = '';
  sortBy: 'name' | 'createdOn';
  sortOrder: 'asc' | 'desc';
  productArray = [];
  id: string;
  showLoader = false;
  isRangeSelected: boolean = false;
  selectedproductName:string
  feature:any
  displayName: string;
  featureUpdatedata:any
  unlimitedValue: any;
  editable: boolean = false;
  public featureForm: FormGroup | null;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private formBuilder: FormBuilder,
    private featureService: FeatureService,
    private routes: Router,
    private productService: ProductsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FeaturesPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: string ,feature:any}

  ) {
    this.selectedproductName = data.productId;
    this.featureUpdatedata=data.feature

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
      .subscribe((data) => {
        this.productArray = data.map((res) => res.productId);
        this.featureForm.patchValue({ productID: this.id });
      });
    this.featureFormData();
    this.featureForm.controls['name'].valueChanges.subscribe((value) => {
      const idValue = value?.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
      this.featureForm.controls['featureId'].setValue(idValue);
    });
    this.featureService.getFeatureById(this.featureUpdatedata.featureId).subscribe((data) => {
      this.updateForm(data);
    });
  }

  featureFormData() {
    this.featureForm = this.formBuilder.group({
      featureId: ['', Validators.required],
      productID: [this.selectedproductName, Validators.required],
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
      ],      status: [true],
      levels: this.formBuilder.array([
        this.formBuilder.group({
          isUnlimited: [false],
          value: ['', [Validators.required, Validators.maxLength(50)]],
          name: ['', [Validators.required, Validators.maxLength(50)]],
            }),
        this.formBuilder.group({
          isUnlimited: [false],
          value: ['', [Validators.required, Validators.maxLength(50)]],
          name: ['', [Validators.required, Validators.maxLength(50)]],
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
    this.position = this.levels.controls.length + 1;
    this.levels.insert(
      this.position,
      this.formBuilder.group({
        isUnlimited: [false],
        value: ['', [Validators.required, Validators.maxLength(50)]],
        name: ['', [Validators.required, Validators.maxLength(50)]],
       })
    );
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
        value: '',
        name: '',
      });
      this.unlimitedButtonLabel = 'Set Unlimited';
    } else {
      lastLevel.patchValue({
        isUnlimited: true,
        value: 'unlimited',
        name: 'unlimited' + ' ' + this.postName + 's',
      });
      this.unlimitedButtonLabel = 'Set Custom Maximum';
    }
    this.isUnlimited = !this.isUnlimited;
  }

  setName(index: number) {
    this.postName = this.featureForm.value.unit;
    this.preName = this.featureForm.value.levels[index].value;
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
        this.levels.removeAt(2); 
      }
      for (let i = 0; i < this.levels.length; i++) {
        const formGroup = this.levels.at(i); 
        formGroup.patchValue({
          value: '',
          name: '',
        });
      }
    } else if (value === 'quantity') {
      this.isRangeSelected = false;
      this.featureForm.controls['unit'].reset();

      for (let i = 0; i < this.levels.length; i++) {
        const formGroup = this.levels.at(i); 
        formGroup.patchValue({
          value: '',
          name: '',
        });
      }
    } else {
      this.isRangeSelected = false;
    }
  }
  updateForm(res: any) {
    
    this.editable = true;
    if (res.status === 'active') {
      this.status = true;
    } else if (res.status === 'draft') {
      this.status = false;
    }
    if (res.type === 'range') {
      this.isRangeSelected = true;
    }
    this.featureForm.patchValue({
      featureId: res.data.featureId,
      name: res.data.name,
      description: res.data.description,
      type: res.data.type,
      status: this.status,
      unit: res.data.unit,
      levels: res.data.levels,
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
  checkTypeBeforeSubbmission(){
    this.levels.controls.forEach((ele, index) => {
      if (!ele.get('level')) {
        (<FormGroup>ele).addControl('level', new FormControl(index));
      } else {
        ele.get('level').setValue(index);
      }
    });

    const status = this.featureForm.value.status ? 'active' : 'draft';
    this.feature = {
      featureId: this.featureForm.value.featureId,
      productID: this.featureForm.value.productID,
      name: this.featureForm.value.name,
      description: this.featureForm.value.description,
      type: this.featureForm.value.type,
      status: status,
      levels: [],
    };
    if (this.featureForm.value.type === 'quantity') {
      this.feature = {
        ...this.feature,
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
      this.feature = {
        ...this.feature,
        unit: this.featureForm.value.unit,
        levels: levels,
      };
    }

    if (this.featureForm.value.type === 'range') {
      this.feature = {
        ...this.feature,
        unit: this.featureForm.value.unit,
        levels: this.featureForm.value.levels,
      };
    }
  }
  onSubmit() {
   this.showLoader = true;
    this.checkTypeBeforeSubbmission();
    if (!this.editable){
      this.subscription = this.featureService.addFeature(this.feature).subscribe({
        next: (res: any) => {
          this.showLoader = false;
         this.onDelete();
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
    }else{
      this.subscription = this.featureService.updateFeature(this.feature.featureId,this.feature).subscribe({
        next: (res: any) => {
          this.showLoader = false;
          this.onDelete();
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
  
  }

  onDelete() {
    this.dialogRef.close(false);
  }

  openSuccess() {
    this.dialog.open(SuccessDialogComponent, {
      width: '411px',
      data: {
        module: 'Feature',
        operation: 'is created',
      },
    });
  }
  switchSample() {
    0;
    this.featureForm.removeControl('unit');
    this.isRangeSelected = false;

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

    values.forEach((item, index) => {
      this.levels.at(index)?.patchValue(item);
    });
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

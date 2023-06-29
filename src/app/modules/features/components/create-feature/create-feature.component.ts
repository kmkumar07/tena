import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/modules/products/services/products.service';
import { SuccessDialogComponent } from 'src/app/shared/components/dialog-box/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LogViewComponent } from 'src/app/modules/payment-history/logs/components/log-view/log-view.component';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

export interface menuOptions {
  value: number;
  title: string;
}

@Component({
  selector: 'app-create-feature',
  templateUrl: './create-feature.component.html',
  styleUrls: ['./create-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  productArray = [];
  id: string;
  isRangeSelected: boolean = false;

  @ViewChild(SnackBarComponent, { static: false })
  snackbarComponent: SnackBarComponent;

  public featureForm: FormGroup | null;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private formBuilder: FormBuilder,
    private featureService: FeatureService,
    private routes: Router,
    private productService: ProductsService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.productService
      .getProducts(this.PageNumber, this.limit, this.search)
      .subscribe((data) => {
        this.productArray = data.map((res) => res.productId);
        this.featureForm.patchValue({ productID: this.id });
      });
    this.feature();
    this.featureForm.controls['name'].valueChanges.subscribe((value) => {
      const idValue = value?.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
      this.featureForm.controls['featureId'].setValue(idValue);
    });
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
      unit: ['', Validators.required],
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
        name: 'unlimited' + ' ' + this.postName+'s',
      });
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

    }
   else if (value === 'quantity') {
      this.isRangeSelected = false;
      this.featureForm.controls['unit'].reset();

      for (let i = 0; i < this.levels.length; i++) {
        const formGroup = this.levels.at(i); // Get the specific form group
        formGroup.patchValue({
          value: '',
          name: '',
        });
      }

    }
     else {
      this.isRangeSelected = false;
    }
  }
  openSnackbar(message: string) {
    const config: MatSnackBarConfig = {
      duration: 5000
    };
    this.snackbarComponent.open(message, config);
  }

  onSubmit() {
    this.levels.controls.forEach((ele, index) => {
      if (!ele.get('level')) {
        (<FormGroup>ele).addControl('level', new FormControl(index));
      } else {
        ele.get('level').setValue(index);
      }
    });

    const status = this.featureForm.value.status ? 'active' : 'disabled';
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
          isUnlimited: '',
        };
      });
      feature = {
        ...feature,
        unit: this.featureForm.value.unit,
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
        this.openSnackbar(error.error.message); 
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
}

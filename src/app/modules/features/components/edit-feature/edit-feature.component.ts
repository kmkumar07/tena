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
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProductsService } from 'src/app/modules/products/services/products.service';
import { SuccessDialogComponent } from 'src/app/shared/components/dialog-box/success-dialog/success-dialog.component';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import {
  Data_Type,
  feature_types,
  User_Data,
} from 'src/app/shared/constants/consants';
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
  unlimitedButtonLabel: string = 'Set Unlimited';
  PageNumber: any = '';
  limit: any = '';
  search: string = '';
  productId = [];
  status: boolean
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
    unit: [null, Validators.required],
    status: [false],
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

  @ViewChild(SnackBarComponent, { static: false })
  snackbarComponent: SnackBarComponent;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private formBuilder: FormBuilder,
    private featureService: FeatureService,
    private routes: Router,
    private route: ActivatedRoute,
    private productService: ProductsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.productService
      .getProducts(this.PageNumber, this.limit, this.search)
      .subscribe((data) => {
        this.productId = data.map((res) => res.productId);
      });
    const id = this.route.snapshot.params['id'];

    this.featureService.getFeatureById(id).subscribe((data) => {
      console.log('a', data)
      this.updateForm(data);
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
        value: 'Unlimited',
        name: 'Unlimited' + ' ' + this.postName,
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

  openSnackbar(message: string) {
    const config: MatSnackBarConfig = {
      duration: 5000
    };
    this.snackbarComponent.open(message, config);
  }

  updateForm(res: any) {
    if (res.status === 'active') {
      this.status = true;
    } else if (res.status === 'disabled') {
      this.status = false;
    }
    this.featureForm.patchValue({
      featureId: res.featureId,
      productID: res.product.productId,
      name: res.name,
      description: res.description,
      type: res.type,
      status: this.status,
      unit: res.unit,
      levels: res.levels,
    });
    if (Array.isArray(res.levels) && res.levels.length >= 0) {
      const levelsControl = this.featureForm.get('levels') as FormArray;
      levelsControl.clear();

      res.levels.forEach((level: any) => {
        const levelGroup = this.formBuilder.group({
          isUnlimited: [level.isUnlimited],
          level: [level.level],
          name: [level.name],
          value: [level.value],
        });

        levelsControl.push(levelGroup);
      });
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
    }
    this.subscription = this.featureService
      .updateFeature(this.featureForm.value.featureId, feature)
      .subscribe({
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
        operation: 'is updated',
      },
    });
  }
}

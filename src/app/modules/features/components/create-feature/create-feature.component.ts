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
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/modules/products/services/products.service';

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
  PageNumber = 1;
  limit = 5;
  search: string = '';
  productArray = [];
  id: string;

  public featureForm: FormGroup | null;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private formBuilder: FormBuilder,
    private featureService: FeatureService,
    private routes: Router,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.id = this.productService.getId();

    this.productService
      .getProducts(this.PageNumber, this.limit, this.search)
      .subscribe((data) => {
        this.productArray = data.map((res) => res.productId);
      });
    this.feature();
  }

  feature() {
    this.featureForm = this.formBuilder.group({
      featureId: ['', Validators.required],
      productID: [this.id ? this.id : '', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      unit: ['', Validators.required],
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
  }

  get levels() {
    return this.featureForm.controls['levels'] as FormArray;
  }
  getLevelList(index: number) {
    const levelList = this.levels.at(index) as FormGroup;
    return levelList;
  }
  addLevels() {
    this.position = this.levels.controls.length - 1;
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

  onSubmit() {
    this.levels.controls.forEach((ele, index) => {
      if (!ele.get('level')) {
        (<FormGroup>ele).addControl('level', new FormControl(index));
      } else {
        ele.get('level').setValue(index);
      }
    });

    const status = this.featureForm.value.status ? 'active' : 'disabled';
    const feature = {
      ...this.featureForm.value,
      status: status,
    };
    console.log('feature', feature);

    this.subscription = this.featureService.addFeature(feature).subscribe({
      next: (res: any) => {
        this.routes.navigate([`/features/view/${res.featureId}`]);
        return res;
      },
      error: (err: any) => {
        console.log('something wrong occured', err);
      },
    });
  }

  onDelete() {
    this.routes.navigate(['/features']);
  }
}

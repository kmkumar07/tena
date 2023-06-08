import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProductsService } from 'src/app/modules/products/services/products.service';
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
  PageNumber = 1;
  limit = 5;
  search: string = '';
  productId = [];
  featureForm: any = this.formBuilder.group({
    featureId: [null, Validators.required],
    productID: [null, Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
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

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private formBuilder: FormBuilder,
    private featureService: FeatureService,
    private routes: Router,
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.productService
      .getProducts(this.PageNumber, this.limit, this.search)
      .subscribe((data) => {
        this.productId = data.map((res) => res.productId);
      });
    const id = this.route.snapshot.params['id'];

    this.featureService.getFeatureById(id).subscribe((data) => {
      console.log("a", data);
      
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

  updateForm(res: any) {
    this.featureForm.setValue({
      featureId: res.featureId,
      productID: res.product.productId,
      name: res.name,
      description: res.description,
      type: res.type,
      status: res.status,
      unit: res.unit || null,
      levels: res.levels
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

    this.subscription = this.featureService
      .updateFeature(this.featureForm.value.featureId, feature)
      .subscribe({
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

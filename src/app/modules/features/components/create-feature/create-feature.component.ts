import { Component, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
  Data_Type,
  User_Data,
  feature_types,
} from 'src/app/shared/constants/consants';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import getUniqueId from 'src/app/core/utils/functions/getUniqueId';

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

  public featureForm: FormGroup;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(private form: FormBuilder) {}

  ngOnInit() {
    this.featureForm = this.form.group({
      id: [getUniqueId(), Validators.required],
      productID: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      unit: ['', Validators.required],
      status: [false],
      entitlmentRange: ['', Validators.required],
      entitlmentName: ['', Validators.required],
      levels: this.form.array([]),
    });
  }

  get levels() {
    return this.featureForm.controls['levels'] as FormArray;
  }

  addLevels() {
    const levelsForm = this.form.group({
      title: ['', Validators.required],
      level: ['', Validators.required],
    });
    this.levels.push(levelsForm);
  }

  deleteLevels(levelIndex: number) {
    this.levels.removeAt(levelIndex);
  }

  onSubmit() {
    console.log(this.featureForm.value, 'test');
  }
}

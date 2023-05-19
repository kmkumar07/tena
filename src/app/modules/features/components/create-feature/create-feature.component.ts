import { Component, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
  Data_Type,
  User_Data,
  feature_types,
} from 'src/app/shared/constants/consants';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  
  public featureForm: FormGroup
  
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(private form: FormBuilder) {}

  ngOnInit(){
    this.featureForm = this.form.group({
      feature_id: [getUniqueId(), Validators.required],
      product_name: ['', Validators.required],
      feature_name: ['', Validators.required],
      description: ['', Validators.required],
      feature_type: ['', Validators.required],
      levels:[],
      entitlement_Units: ['', Validators.required],
      entitlement_Range: ['', Validators.required],
      status: [false]
    })
  }

  onSubmit(){
    console.log(this.featureForm.value, "test")
  }  

}

import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ViewChild } from '@angular/core';
import {
  Data_Type,
  User_Data,
  feature_types,
} from 'src/app/shared/constants/consants';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  ngOnInIt(){
    this.featureForm = this.form.group({
      feature_id: ['', Validators.required],
      product_name: ['', Validators.required],
      feature_name: ['', Validators.required],
      description: ['', Validators.required],
      feature_type: ['', Validators.required],
      created_at: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

}

import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  pricingModels,
  selectOptions,
  periodUnit,
} from 'src/app/shared/constants/consants';
import { MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'app-set-price',
  templateUrl: './set-price.component.html',
  styleUrls: ['./set-price.component.scss'],
})
export class SetPriceComponent {
  pricingModelTypes: selectOptions[] = pricingModels;
  periodUnit: string[] = periodUnit;
  selectedTab: number;
  public setPriceForm: FormGroup;
  constructor(private form: FormBuilder) {}
  ngOnInit() {
    this.setPriceForm = this.form.group({
      id: ['', Validators.required],
      planID: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      invoiceNotes: ['', Validators.required],
      currencyCode: ['', Validators.required],
      pricingModel: ['', Validators.required],
      price: ['', Validators.required],
      periodUnit: ['daily', Validators.required],
      period: ['', Validators.required],
      trialPeriodUnit: ['', Validators.required],
      trialPeriod: ['', Validators.required],
      status: [false],
    });
  }
  setPeriod(periodSelected: string){
    this.setPriceForm.patchValue({
      periodUnit: periodSelected
    });
  }
  onTabChange(event: MatTabChangeEvent): void {
    this.selectedTab = event.index;
    if(this.selectedTab == 0) {
      this.setPeriod('daily')
    }
    else if (this.selectedTab == 1) {
      this.setPeriod('weekly')
    }
    else if (this.selectedTab == 2) {
      this.setPeriod('monthly')
    }
    else if (this.selectedTab == 3) {
      this.setPeriod('yearly')
    }
  }
  submitValues() {
    console.log(this.setPriceForm.value, 'test what is here');
  }
}

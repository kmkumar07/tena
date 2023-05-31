import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  selectedTab: number = 0;
  previePrice: number = 0;
  monthlyBilling = ['3', '4', '5'];
  readOnly: boolean = false
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
      isExpirable: [true],
      noOfCycle: ['', Validators.required],
      status: [false],
      tiers: this.form.array([
        this.form.group({
          startingUnit: { value: '1', disabled: true },
          endingUnit: { value: '& above', disabled: true },
          price: [''],
        }),
      ]),
    });
  }
  getLevelList(index: number) {
    const tierList = this.tiers.at(index) as FormGroup;
    return tierList;
  }
  setPeriod(periodSelected: string) {
    this.setPriceForm.patchValue({
      periodUnit: periodSelected,
    });
  }
  get tiers() {
    return this.setPriceForm.controls['tiers'] as FormArray;
  }
  lastObj() {
    const checkCurrent = this.tiers.length - 1;
    return this.getLevelList(checkCurrent);
  }
  secondLastObj() {
    const checkPrev = this.tiers.length - 2;
    return this.getLevelList(checkPrev);
  }
  addTiers() {
    this.tiers.push(
      this.form.group({
        startingUnit: { value: '', disabled: true },
        endingUnit: [''],
        price: [''],
      })
    );

    const lastIdx = this.lastObj();
    const prevIdx = this.secondLastObj();
    console.log('check', lastIdx, prevIdx);
    lastIdx.patchValue({
      endingUnit: '& above',
    });
    lastIdx.get('endingUnit')?.disable();
    prevIdx.patchValue({
      endingUnit: '',
    });
    prevIdx.get('endingUnit')?.enable();
  }
  onTabChange(event: MatTabChangeEvent): void {
    this.selectedTab = event.index;
    if (this.selectedTab == 0) {
      this.setPeriod('daily');
    } else if (this.selectedTab == 1) {
      this.setPeriod('weekly');
    } else if (this.selectedTab == 2) {
      this.setPeriod('monthly');
    } else if (this.selectedTab == 3) {
      this.setPeriod('yearly');
    }
  }
  deleteTier(tierIndex: number) {
    this.tiers.removeAt(tierIndex);
    const lastIdx = this.lastObj();
    lastIdx.get('endingUnit')?.setValue('& Above')
    lastIdx.get('endingUnit')?.disable()
  }
  cycleValue(event: any) {
    if (event.value === '1') {
      this.setPriceForm.patchValue({
        noOfCycle: '2',
        isExpirable: true,
      });
    } else if (event.value === '2') {
      this.setPriceForm.patchValue({
        noOfCycle: '0',
        isExpirable: false,
      });
    }
  }
  submitValues() {
    console.log(this.setPriceForm.value, 'test what is here');
  }
  // checkIndex(index: number) {
  //   const position = this.tiers.length - 1;
  //   if (index > 0 && index !== position) {
  //     return this.readOnly = true;
  //   } else {
  //     return false;
  //   }
  // }
  setStartingValue(event: any, index: number) {
    const setStarting = Number(event.target.value);
    const getNext = index + 1;
    const NextObject = this.getLevelList(getNext);
    NextObject.patchValue({
      startingUnit: setStarting + 1,
    });
  }
  getPreviewPrice(event: any) {
    this.previePrice = event.target.value * this.setPriceForm.value.price;
  }
}

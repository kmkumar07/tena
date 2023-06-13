import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  pricingModels,
  selectOptions,
  periodUnit,
} from 'src/app/shared/constants/consants';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PriceService } from '../../price.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-set-price',
  templateUrl: './set-price.component.html',
  styleUrls: ['./set-price.component.scss'],
})
export class SetPriceComponent {
  subscription: Subscription;
  pricingModelTypes: selectOptions[] = pricingModels;
  periodUnit: string[] = periodUnit;
  selectedTab: number = 0;
  previePrice: number = 0;
  total: number = 0;
  price:any;
  monthlyBilling = ['3', '4', '5'];
  readOnly: boolean = false;
   start=0;
   check:string;
   dropKey:number
  public setPriceForm: FormGroup;
  constructor(private form: FormBuilder, private priceService: PriceService) {}
  ngOnInit() {
  this.formData()
}
formData(){
  this.setPriceForm = this.form.group({
    priceid: ['', Validators.required],
    planID: ['qwerty123', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    invoiceNotes: ['', Validators.required],
    currencyCode: ['USD', Validators.required],
    pricingModel: ['', Validators.required],
    price: ['', Validators.required],
    periodUnit: ['daily', Validators.required],
    period: ['1', Validators.required],
    isExpirable: [true],
    noOfCycle: ['', Validators.required],
    status:"active",
    tiers: this.form.array([
      this.form.group({
        startingUnit: { value: '1', disabled: true },
        endingUnit: { value: ' ', disabled: true },
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
    lastIdx.patchValue({
      endingUnit: ' ',
    });
    lastIdx.get('endingUnit')?.disable();
    prevIdx.patchValue({
      endingUnit: '',
    });
    prevIdx.get('endingUnit')?.enable();
  }
  onTabChange(event: MatTabChangeEvent): void {
    this.formData()
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
  onDropdownKey(event:number): void {
   this.dropKey=event
  
  }
  deleteTier(tierIndex: number) {
    this.tiers.removeAt(tierIndex);
    const lastIdx = this.lastObj();
    lastIdx.get('endingUnit')?.setValue(' ');
    lastIdx.get('endingUnit')?.disable();
  }
  selectedOption: string;
  inputValue: string;
  cycleValue(event: any) {
    this.selectedOption = event.value;
    if (this.selectedOption === '1') {
      this.setPriceForm.patchValue({
        noOfCycle: '',
        isExpirable: true,
      });
    } else if (this.selectedOption === '2') {
      this.setPriceForm.patchValue({
        noOfCycle: '0',
        isExpirable: false,
      });
    }
  }
 
  pricingModelValueToName(price:any){
    
    if (price) {
      price.priceid =
        price.planID + '-' + price.currencyCode + '-' + price.periodUnit;
    }
    if(price.pricingModel==1){
      price.pricingModel="Flat fee"
    }  
     if(price.pricingModel==2){
      price.pricingModel="Per unit"
    }
    if(price.pricingModel==3){
      price.pricingModel="Tired"
    }
    if(price.pricingModel==4){
      price.pricingModel="Volume"
    }   if(price.pricingModel==5){
      price.pricingModel="Stairstep"
    }
  }
   submitValues() {
    this.price = this.setPriceForm.getRawValue();
   this.pricingModelValueToName(this.price);
    this.subscription = this.priceService
      .createPrice(this.price)
      .subscribe((res) => {
      });
   }
 
  checkIndex(index: number) {
    const position = this.tiers.length - 1;
    if (index > 0 && index !== position) {
      return (this.readOnly = true);
    } else {
      return false;
    }
  }

  setStartingValue(event: any, index: number) {
    const setStarting = Number(event.target.value);
    if(this.start<setStarting){
    this.start=Number(event.target.value)+1;
    const getNext = index + 1;
    const NextObject = this.getLevelList(getNext);
    NextObject.patchValue({
      startingUnit: setStarting + 1,
    });
  }
  else{
     this.check="plz put above value from startingunit";
  }
  }
  getPreviewPrice(event: any) {
   
    let input = parseInt(event.target.value);
    const arr = this.setPriceForm.value.tiers;
    let i = 0;
    let total1 = 0;
    while (i < arr.length && input > 0) {
      if (i == arr.length - 1) {
        total1 += input * arr[i].price;
        input = 0;
      }
      let gap = 0;
      if (i == 0) {
        gap = arr[0].endingUnit;
      } else {
        gap = arr[i].endingUnit - arr[i - 1].endingUnit;
      }

      if (input >= gap) {
        total1 += arr[i].price * gap;
        input -= gap;
      } else {
        total1 += arr[i].price * input;
        input = 0;
      }

      i++;
    }
    this.total = total1;
    this.previePrice = event.target.value * this.setPriceForm.value.price;
     }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

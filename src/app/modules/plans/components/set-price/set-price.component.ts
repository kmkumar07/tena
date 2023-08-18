import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  pricingModels,
  selectOptions,
  periodUnit,
} from 'src/app/shared/constants/consants';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription, takeUntil } from 'rxjs';
import { SuccessDialogComponent } from 'src/app/shared/components/dialog-box/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from '../../services/plan.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export class PlanValue {
  planId: string;
  internalName: string;
}
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
  previePrice: number;
  tiredTotal: number;
  volumeTotal: number;
  stairTotal: number;
  price: any;
  planValue: any = {};
  monthlyBilling = ['3', '4', '5'];
  readOnly: boolean = false;
  start = 0;
  check: string;
  dropKey: number;
  planId: string;
  editPriceStatus: boolean;
  public setPriceForm: FormGroup;

  constructor(
    private form: FormBuilder,
    private global: GlobalService,
    private planService: PlanService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.planId = this.route.snapshot.params['id'];
    this.formData();
    // this.getPriceVal();
    this.getCurrPLan();
  }

  // getPriceVal() {
  //   this.planService
  //     .getEditPrice()
  //     .pipe(takeUntil(this.global.componentDestroyed(this)))
  //     .subscribe((res) => {
  //       this.editPriceStatus = res;
  //       if (this.editPriceStatus) {
  //         this.planService
  //           .getPriceById(this.planId)
  //           .subscribe((res) => console.log('price', res));
  //       } else {
  //         this.getCurrPLan();
  //       }
  //     });
  // }

  getCurrPLan() {
    this.planService
      .getPlanById(this.planId)
      .pipe(takeUntil(this.global.componentDestroyed(this)))
      .subscribe((res) => {
        this.planValue = res.data;
      });
  }

  patchValue() {
    this.setPriceForm.patchValue({
      planId: this.planValue.planId,
      name: this.planValue.internalName,
    });
  }

  formData() {
    this.setPriceForm = this.form.group({
      priceId: ['', Validators.required],
      planId: ['', Validators.required],
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
      status: 'active',
      multiPricing: this.form.array([
        this.form.group({
          startingUnit: { value: '1', disabled: true },
          endingUnit: { value: '&above', disabled: true },
          price: [''],
        }),
      ]),
    });
  }

  getLevelList(index: number) {
    const tierList = this.multiPricing.at(index) as FormGroup;
    return tierList;
  }

  setPeriod(periodSelected: string) {
    this.setPriceForm.patchValue({
      periodUnit: periodSelected,
    });
  }

  get multiPricing() {
    return this.setPriceForm.controls['multiPricing'] as FormArray;
  }

  lastObj() {
    const checkCurrent = this.multiPricing.length - 1;
    return this.getLevelList(checkCurrent);
  }

  secondLastObj() {
    const checkPrev = this.multiPricing.length - 2;
    return this.getLevelList(checkPrev);
  }

  addMultiPricing() {
    this.multiPricing.push(
      this.form.group({
        startingUnit: { value: '', disabled: true },
        endingUnit: ['&above'],
        price: [''],
      })
    );

    const lastIdx = this.lastObj();
    const prevIdx = this.secondLastObj();
    lastIdx.patchValue({
      endingUnit: '&above',
    });
    lastIdx.get('endingUnit')?.disable();
    prevIdx.patchValue({
      endingUnit: '',
    });
    prevIdx.get('endingUnit')?.enable();
  }

  onTabChange(event: MatTabChangeEvent): void {
    // this.formData();
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
    this.formData();

  }

  onDropdownKey(event: number): void {
    this.dropKey = event;
  }

  deleteTier(tierIndex: number) {
    this.multiPricing.removeAt(tierIndex);
    const lastIdx = this.lastObj();
    lastIdx.get('endingUnit')?.setValue('&above');
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
        noOfCycle: '',
        isExpirable: false,
      });
    }
  }

  pricingModelSetEndingUnitEmpty(price: any) {
    for (let i = 0; i < price.multiPricing.length; i++) {
      if (price.multiPricing[i].endingUnit == '&above') {
        price.multiPricing[i].endingUnit = '';
      }
    }
  }

  pricingModelValueToName(price: any) {
    if (price) {
      price.priceId =
        price.planId + '-' + price.currencyCode + '-' + price.periodUnit;
      price.name =
      price.planId + '-' + price.currencyCode + '-' + price.periodUnit;
    }
    if (price.pricingModel == 1) {
      price.pricingModel = 'flat_fee';
      price.multiPricing = [];
    }
    if (price.pricingModel == 2) {
      price.pricingModel = 'per_unit';
      price.multiPricing = [];
    }
    if (price.pricingModel == 3) {
      price.pricingModel = 'tiered';
      this.pricingModelSetEndingUnitEmpty(price);
    }
    if (price.pricingModel == 4) {
      price.pricingModel = 'volume';
      this.pricingModelSetEndingUnitEmpty(price);
    }
    if (price.pricingModel == 5) {
      price.pricingModel = 'stairStep';
      this.pricingModelSetEndingUnitEmpty(price);
    }
  }

  submitValues() {
    this.patchValue();
    this.global.showLoader();
    this.price = this.setPriceForm.getRawValue();
    this.pricingModelValueToName(this.price);
    this.subscription = this.planService
      .createPrice(this.price)
      .subscribe({
        next: (res) => {
        this.openSuccess();
        this.planService.setData(this.price);
        this.router.navigate([`/plans/create/${this.planValue.planId}`]);
        this.global.hideLoader();
      },

      error: (err: any)=> {
        this.snackBar.open(err.message, '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        })
      },
    });
    this.global.hideLoader();
  }

  openSuccess() {
    this.dialog.open(SuccessDialogComponent, {
      width: '420px',
      data: {
        module: 'Pricing',
        operation: 'is created',
      },
    });
  }

  checkIndex(index: number) {
    const position = this.multiPricing.length - 1;
    if (index > 0 && index !== position) {
      return (this.readOnly = true);
    } else {
      return false;
    }
  }

  setStartingValue(event: any, index: number) {
    const setStarting = Number(event.target.value);
    if (this.start < setStarting) {
      this.start = Number(event.target.value) + 1;
      const getNext = index + 1;
      const NextObject = this.getLevelList(getNext);
      NextObject.patchValue({
        startingUnit: setStarting + 1,
      });
    } else {
      this.check = 'plz put above value from startingunit';
    }
  }

  getPreviewPrice(event: any) {
    let input = parseInt(event.target.value);
    const arr = this.setPriceForm.value.multiPricing;
    let i = 0;
    let total1 = 0;
    let startUnit = 1;
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

    this.tiredTotal = total1;
    this.previePrice = event.target.value * this.setPriceForm.value.price;
    let inputval = parseInt(event.target.value);
    let voltotal = 0;
    let stTotal = 0;
    let j = 0;
    while (j < arr.length && inputval > 0) {
      if (
        (startUnit <= inputval && inputval <= arr[j].endingUnit) ||
        arr[j].endingUnit === undefined
      ) {
        stTotal = arr[j].price;
        this.stairTotal = stTotal;
        voltotal = inputval * arr[j].price;
        this.volumeTotal = voltotal;
        startUnit = parseInt(arr[j].endingUnit) + 1;
        break;
      }
      j++;
    }
    this.stairTotal = stTotal;
    this.volumeTotal = voltotal;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

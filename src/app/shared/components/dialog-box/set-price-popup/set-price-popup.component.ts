import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  pricingModels,
  Frequency,
  selectOptions,
  periodUnit,
  selectPrice,
} from 'src/app/shared/constants/consants';
import { Subscription, takeUntil } from 'rxjs';
import { SuccessDialogComponent } from 'src/app/shared/components/dialog-box/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from '../../../../modules/plans/services/plan.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter, Output } from '@angular/core';

export class PlanValue {
  planId: string;
  internalName: string;
}

@Component({
  selector: 'app-set-price-popup',
  templateUrl: './set-price-popup.component.html',
  styleUrls: ['./set-price-popup.component.scss'],
})
export class SetPricePopupComponent {
  @Output() priceIdSelected = new EventEmitter<string>();
  subscription: Subscription;
  pricingModelTypes: selectPrice[] = pricingModels;
  FrequencyTypes: selectOptions[] = Frequency;
  periodUnit: string[] = periodUnit;
  selectedTab: number = 0;
  previePrice: number;
  tiredTotal: number;
  volumeTotal: number;
  stairTotal: number;
  price: any;
  planValue: any = {};
  monthlyBilling = ['tiered', 'volume', 'stair_step'];
  readOnly: boolean = false;
  start = 0;
  period: string;
  check: string;
  dropKey: string;
  periodKey: number;
  planId: string;
  pricedataById: any;
  editPriceStatus: boolean;
  public setPriceForm: FormGroup;
  priceId: string;
  pricingId: string;
  selectedFrequency: number;
  selectedPeriodUnitTitle: string;
  editable: boolean = false;
  cycleVal: number;
  selectedOption: string;
  inputValue: string;
  fieldRequired: string = 'This field is required';

  constructor(
    private form: FormBuilder,
    private global: GlobalService,
    private planService: PlanService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SetPricePopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { planId: any; priceId: string; periodUnit: string }
  ) {
    this.planId = this.data.planId;
    this.pricingId = this.data.priceId;
    this.selectedFrequency = this.FrequencyTypes.find(
      (x) => x.title == this.data.periodUnit
    )?.value;
    this.selectedPeriodUnitTitle = this.FrequencyTypes.find(
      (x) => x.title == this.data.periodUnit
    )?.title;
  }

  ngOnInit() {
    this.formData();
    this.getPriceById(this.pricingId);
  }
  getPriceById(id: string) {
    if (id) {
      this.planService.getPriceById(id).subscribe((res) => {
        if (res) {
          this.pricedataById = res.data;
          this.patchValue(this.pricedataById);
        }
      });
    } else {
      this.editable = false;
    }
  }

  patchValue(data: any) {
    data.multiPricing.sort(
      (indexOne:any, indexTwo:any) =>
        indexOne.startingUnit - indexTwo.startingUnit
    );
    this.editable = true;
    this.setPriceForm.patchValue({
      price: data.price,
      periodUnit: Frequency.find((a) => a.title === data.periodUnit).value,
      pricingModel: pricingModels.find((a) => a.value === data.pricingModel)
        .value,
      noOfCycle: data.noOfCycle,
    });

    this.selectedOption = data.isExpirable ? '1' : '2';

    // Clear the existing multiPricing FormArray
    const multiPricingArray = this.setPriceForm.get(
      'multiPricing'
    ) as FormArray;
    while (multiPricingArray.length) {
      multiPricingArray.removeAt(0);
    }

    // Populate the multiPricing FormArray with the data
    data.multiPricing.forEach((item: any) => {
      const newFormGroup = this.form.group({
        startingUnit: { value: item.startingUnit.toString(), disabled: true },
        endingUnit: {
          value:
            item.endingUnit === null ? '&above' : item.endingUnit.toString(),
          disabled: true,
        },
        price: [item.price],
      });
      multiPricingArray.push(newFormGroup);
    });

    this.pricingModelValueToName(this.price);
  }

  formData() {
    this.setPriceForm = this.form.group({
      priceId: [''],
      planId: [this.planId, Validators.required],
      name: [this.planId, Validators.required],
      description: ['i am demo', Validators.required],
      invoiceNotes: ['completed', Validators.required],
      currencyCode: ['USD', Validators.required],
      pricingModel: ['', Validators.required],
      periodUnit: ['', Validators.required],
      period: ['1', Validators.required],
      isExpirable: [''],
      noOfCycle: ['', Validators.required],
      status: 'active',
      billingCycle: ['', Validators.required],
      price: ['', Validators.required],
      multiPricing: this.form.array([
        this.form.group({
          startingUnit: { value: '1', disabled: true },
          endingUnit: [''],
          price: [''],
        }),
      ]),
    });
    this.setPriceForm.get('periodUnit')?.disable();
  }

  checkValidationWithModel(input: string) {
    if (input === 'tiered' || input === 'volume' || input === 'stair_step') {
      this.setPriceForm.get('price').patchValue(0);
    }
    const validation =
      this.setPriceForm.get(input)?.value &&
      (this.setPriceForm.get(input)?.dirty ||
        this.setPriceForm.get(input)?.touched);
    return validation;
  }

  selectPriceId() {
    const priceId = this.price.priceId;
    this.priceIdSelected.emit(priceId);
  }
  getLevelList(index: number) {
    const tierList = this.multiPricing.at(index) as FormGroup;
    return tierList;
  }

  setPeriod(periodSelected: string) {
    this.period = periodSelected;
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
    lastIdx.get('endingUnit');
    prevIdx.get('endingUnit')?.enable();
  }

  onTabChange(event: number): void {
    this.selectedTab = event;

    if (this.selectedTab == 1) {
      this.setPeriod('daily');
    } else if (this.selectedTab == 2) {
      this.setPeriod('weekly');
    } else if (this.selectedTab == 3) {
      this.setPeriod('monthly');
    } else if (this.selectedTab == 4) {
      this.setPeriod('yearly');
    }
    this.formData();
  }

  onDropdownKey(event: number): void {
    this.periodKey = event;
    this.onTabChange(this.periodKey);
  }
  onDropdownKeyWithpricingModel(event: string): void {
    this.dropKey = event;
  }
  deleteTier(tierIndex: number) {
    this.multiPricing.removeAt(tierIndex);
    const lastList = this.multiPricing.value.at(-2);
    const setStarting = lastList.endingUnit
      ? Number(lastList.endingUnit) + 1
      : 1;
    this.start = setStarting;
    const lastIdx = this.lastObj();
    lastIdx.get('endingUnit')?.setValue('&above');
  }

  cycleValue(event: any) {
    this.selectedOption = event.value;
    if (this.selectedOption === '1') {
      this.setPriceForm.patchValue({
        noOfCycle: '',
        isExpirable: true,
      });
    } else if (this.selectedOption === '2') {
      this.setPriceForm.patchValue({
        noOfCycle: 0,
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

    if (price ? price.pricingModel == 'flat_fee' : '') {
      price.multiPricing = [];
    }
    if (price ? price.pricingModel == 'per_unit' : '') {
      price.multiPricing = [];
    }
    if (price ? price.pricingModel == 'tiered' : '') {
      this.pricingModelSetEndingUnitEmpty(price);
    }
    if (price ? price.pricingModel == 'volume' : '') {
      this.pricingModelSetEndingUnitEmpty(price);
    }
    if (price ? price.pricingModel == 'stair_step' : '') {
      this.pricingModelSetEndingUnitEmpty(price);
    }
  }

  submitValues() {
    this.global.showLoader();
    this.price = this.setPriceForm.getRawValue();

    this.price = {
      ...this.price,
      periodUnit: Frequency.find((a) => a.value == this.price.periodUnit).title,
    };

    if (this.editable == false) {
      this.global.showLoader();

      this.pricingModelValueToName(this.price);
      this.subscription = this.planService
        .createPrice(this.price)
        .pipe(takeUntil(this.global.componentDestroyed(this)))
        .subscribe({
          next: (res) => {
            this.dialogRef.close(true);
            this.planService.setData(this.price);
            this.priceId = this.price.priceId;
            this.global.hideLoader();
          },

          error: (err: any) => {
            this.snackBar.open(err.message, '', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
            this.global.hideLoader();
          },
        });
    } else {
      this.global.showLoader();
      this.pricingModelValueToName(this.price);
      this.planService
        .updatePrice(this.price, this.pricingId)
        .pipe(takeUntil(this.global.componentDestroyed(this)))
        .subscribe((res) => {
          this.dialogRef.close(true);
          this.global.hideLoader();
        });
    }
    this.global.hideLoader();
  }
  openUpdateSuccess(planId) {
    this.dialog.open(SuccessDialogComponent, {
      width: '420px',
      data: {
        module: 'Pricing',
        operation: 'is updated',
      },
    });
    this.router.navigate([`/plans/create/${planId}`]);
  }
  openCreateSuccess() {
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

  setStartingValue(index: number) {
    const lastList = this.multiPricing.value.at(-1);
    const setStarting = lastList.endingUnit
      ? Number(lastList.endingUnit) + 1
      : 1;
    if (this.start < setStarting) {
      this.addMultiPricing();
      this.start = setStarting;
      const getNext = index + 1;
      const NextObject = this.getLevelList(getNext);
      NextObject.patchValue({
        startingUnit: setStarting,
      });
    } else {
      this.check = 'please put above value from startingunit';
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
  onCancelClick(): void {
    this.dialogRef.close(false);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

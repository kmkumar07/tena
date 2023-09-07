import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureService } from 'src/app/modules/features/services/feature.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status, selectOptions } from 'src/app/shared/constants/consants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  featureId: string;
  featureName: string;
  featureType: string;
  entitlement: string;
  status: string;
}
@Component({
  selector: 'app-feature-details-popup',
  templateUrl: './feature-details-popup.component.html',
  styleUrls: ['./feature-details-popup.component.scss'],
})
export class FeatureDetailsPopupComponent implements OnInit {
  dropKey: number;
  StatusTypes: selectOptions[] = Status;
  featureDetails: any;
  public setPriceForm: FormGroup;
  constructor(
    private form: FormBuilder,
    private featureService: FeatureService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,

    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.featureService
      .getFeatureById(this.data.featureId['featureId'])
      .subscribe((res) => {
        this.featureDetails = res;

        this.data.featureName = this.featureDetails?.name;
        this.data.featureType = this.featureDetails?.type;
        this.data.status = this.featureDetails?.status;

        if (this.data.featureType === 'switch') {
          this.data.entitlement = 'OFF';
        } else if (this.data.featureType === 'quantity') {
          this.data.entitlement = 'ON';
        }
      });
  }

  closePopup() {
    this.dialog.closeAll();
  }

  editFeature() {
    this.router.navigate([
      `/features/edit-feature/${this.data.featureId['featureId']}`,
    ]);
    this.dialog.closeAll();
  }
  onDropdownKey(event: number): void {
    this.dropKey = event;
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
  onCancelClick(): void {
    this.dialog.closeAll();
  }
}

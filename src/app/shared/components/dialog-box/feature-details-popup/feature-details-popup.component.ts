import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureService } from 'src/app/modules/features/services/feature.service';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Status, selectOptions } from 'src/app/shared/constants/consants';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

export interface DialogData {
  featureId: string;
  featureName: string;
  featureType: string;
  entitlement: string;
  status: string;
}
interface Food {
  value: string;
  viewValue: string;
}
export interface PeriodicElement {
  name: string;
  position: number;
  type: string;
  status: string;
  entitlements : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Whiteboard', status: 'Active', type: 'Switch',entitlements:''},
  {position: 2, name: 'Email support', status: 'Active', type: 'Custom',entitlements:''},
  {position: 3, name: 'API Call', status: 'Active', type: 'Range',entitlements:''},
  {position: 4, name: 'User License', status: 'Active',type: 'Quantity',entitlements:''},
];
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

  displayedColumns: string[] = ['select', 'name', 'type', 'status','entitlements'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

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

}

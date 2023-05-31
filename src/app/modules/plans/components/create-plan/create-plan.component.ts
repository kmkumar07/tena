import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeatureDetailsPopupComponent } from 'src/app/shared/components/dialog-box/feature-details-popup/feature-details-popup.component';
import { plan_add_empty_data } from 'src/app/shared/constants/consants';

export interface PeriodicElement {
  PricingCycle: string; 
  Price: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { PricingCycle: 'Daily', Price: 'Set Price' },
  { PricingCycle: 'Weekly', Price: 'Set Price' },
  { PricingCycle: 'Monthly', Price: 'Set Price' },
  { PricingCycle: 'Yearly', Price: 'Set Price' },
];

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.scss'],
})
export class CreatePlanComponent {
  planAddEmptyData = plan_add_empty_data;
  constructor(public dialog: MatDialog) {}
  openPopup() {
    this.dialog.open(FeatureDetailsPopupComponent, {});
  }

  displayedColumns: string[] = ['PricingCycle', 'Price'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
}

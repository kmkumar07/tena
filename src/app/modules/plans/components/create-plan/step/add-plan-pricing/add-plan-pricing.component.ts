import { Component } from '@angular/core';

export interface PeriodicElement {
  PricingCycle: string;
  PricingModel: string;
  BillingCycle: any;
  Price: any;
  action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {PricingCycle: 'Daily', PricingModel: 'Tiered', BillingCycle: 'Fixed', Price: '$100/Unit', action:''},
  {PricingCycle: 'Weekly', PricingModel: 'Tiered', BillingCycle: 'Fixed', Price: '$100/Unit', action:''},
  {PricingCycle: 'Monthly', PricingModel: 'Tiered', BillingCycle:'Fixed', Price: '$100/Unit',  action:''},
  {PricingCycle: 'Yearly', PricingModel: 'Tiered', BillingCycle: 'Fixed', Price: '$100/Unit',  action:''},
];

@Component({
  selector: 'app-add-plan-pricing',
  templateUrl: './add-plan-pricing.component.html',
  styleUrls: ['./add-plan-pricing.component.scss']
})
export class AddPlanPricingComponent {
  displayedColumns: string[] = ['PricingCycle', 'PricingModel', 'BillingCycle', 'Price','action'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
}

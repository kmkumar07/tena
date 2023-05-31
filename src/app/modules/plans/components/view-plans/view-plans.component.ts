import { Component } from '@angular/core';

export interface PeriodicElement {
  PricingCycle: string;
  Price: any;
  Currency: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Currency:'',PricingCycle: 'Daily',  Price: '$100/Unit' },
  {Currency:'',PricingCycle: 'Weekly',  Price: '$100/Unit'},
  {Currency:'',PricingCycle: 'Monthly', Price: '$100/Unit'},
  {Currency:'',PricingCycle: 'Yearly', Price: '$100/Unit'},
];

@Component({
  selector: 'app-view-plans',
  templateUrl: './view-plans.component.html',
  styleUrls: ['./view-plans.component.scss']
})
export class ViewPlansComponent {
  displayedColumns: string[] = ['Currency','PricingCycle', 'Price'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  panelOpenState = false;
  toggle() {
    this.panelOpenState = !this.panelOpenState;
    console.log(this.panelOpenState);
   }
}

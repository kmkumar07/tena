import { Component } from '@angular/core';

export interface DiscountElement {
  Discount : string;
  Amount: any;
}
export interface DurationElement {
  Duration : string;
  time: any;
}

export interface ValidityElement {
  Validity : string;
  time: any;
}

const ELEMENT_DATA: DiscountElement[] = [
  {  Discount : 'Discount Type', Amount: 'Fixed Amount' },
  { Discount : 'Applied on', Amount: 'Fixed Amount' },
  {  Discount : 'Discount Type', Amount: 'Invoice Amount' },
];

const Duration_DATA: DurationElement[] = [
  {  Duration : 'Discount Type', time: 'Forever' },
  { Duration : 'Applied on', time: 'All Plans' },
  {  Duration : 'Discount Type', time: 'All Addons' },
];

const Validity_DATA: ValidityElement[] = [
  {  Validity : 'Valid Till', time: 'Forever' },
  { Validity : 'Maximum Redemptions', time: '0 to unlimited' },
];
@Component({
  selector: 'app-view-coupons',
  templateUrl: './view-coupons.component.html',
  styleUrls: ['./view-coupons.component.scss']
})
export class ViewCouponsComponent {
  displayedColumns: string[] = ['Discount', 'Amount'];
  displayedColumns2: string[] = ['Duration','time'];
  displayedColumns3: string[] = ['Validity','time'];
  dataSource = ELEMENT_DATA;
  dataDuration = Duration_DATA;
  dataValidity = Validity_DATA;
  clickedRows = new Set<DiscountElement>();
}

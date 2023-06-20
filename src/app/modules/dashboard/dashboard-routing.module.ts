import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListingComponent } from './customer/components/customer-listing/customer-listing.component';
import { CustomerViewComponent } from './customer/components/customer-view/customer-view.component';
import { SubscriptionListingComponent } from './subscription/components/subscription-listing/subscription-listing.component';
import { SubscriptionViewComponent } from './subscription/components/subscription-view/subscription-view.component';


const routes: Routes = [
  { path: 'customers', component: CustomerListingComponent },
  { path: 'customers/view', component: CustomerViewComponent },
  { path: 'subscription', component: SubscriptionListingComponent },
  { path: 'subscription/view', component: SubscriptionViewComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule implements OnInit {
  constructor() {}
  ngOnInit() {}
}

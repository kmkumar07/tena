import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponsListingComponent } from './components/coupons-listing/coupons-listing.component';
import { CreateCouponsComponent } from './components/create-coupons/create-coupons.component';
import { ViewCouponsComponent } from './components/view-coupons/view-coupons.component';

const routes: Routes = [
  { path: '', component: CouponsListingComponent },
  { path: 'create', component: CreateCouponsComponent },
  { path: 'view', component: ViewCouponsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponsRoutingModule {}

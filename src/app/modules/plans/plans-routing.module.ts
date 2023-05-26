import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansListingComponent } from './components/plans-listing/plans-listing.component';
import { SideStepperComponent } from './components/side-stepper/side-stepper.component';

import { ViewPlansComponent } from './components/view-plans/view-plans.component';
import { CreatePlanComponent } from './components/create-plan/create-plan.component';
import { SetPriceComponent } from './components/set-price/set-price.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
const routes: Routes = [
  { path: '', component: PlansListingComponent },
  { path: 'view', component: ViewPlansComponent },
  { path: 'create', component: CreatePlanComponent },
  { path: 'create/set-price', component: SetPriceComponent},
  { path: 'create/product-detail', component: ProductDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlansRoutingModule {}

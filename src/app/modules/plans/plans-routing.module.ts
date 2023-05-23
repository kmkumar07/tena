import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansListingComponent } from './components/plans-listing/plans-listing.component';
import { SideStepperComponent } from './components/side-stepper/side-stepper.component';

import { ViewPlansComponent } from './components/view-plans/view-plans.component';
import { CreatePlanComponent } from './components/create-plan/create-plan/create-plan.component';
const routes: Routes = [
  {path:'', component: PlansListingComponent},
  {path:'create', component: CreatePlanComponent},
  {path:'view', component: ViewPlansComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }

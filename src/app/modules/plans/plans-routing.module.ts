import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansListingComponent } from './components/plans-listing/plans-listing.component';
import { CreatePlanComponent } from './components/create-plan/create-plan/create-plan.component';

const routes: Routes = [
  {path:'', component: PlansListingComponent},
  {path:'create-plan', component: CreatePlanComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }

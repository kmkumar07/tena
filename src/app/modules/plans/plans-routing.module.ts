import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansListingComponent } from './components/plans-listing/plans-listing.component';
<<<<<<< HEAD
import { SideStepperComponent } from './components/side-stepper/side-stepper.component';

const routes: Routes = [
  {path:'', component: SideStepperComponent}
=======
import { ViewPlansComponent } from './components/view-plans/view-plans.component';

const routes: Routes = [
  {path:'', component: PlansListingComponent},
  {path:'view', component: ViewPlansComponent}
>>>>>>> 2868727e06108503eaf87fb91153a5d2f0a4c760
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }

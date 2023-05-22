import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansListingComponent } from './components/plans-listing/plans-listing.component';
import { SideStepperComponent } from './components/side-stepper/side-stepper.component';

const routes: Routes = [
  {path:'', component: SideStepperComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }

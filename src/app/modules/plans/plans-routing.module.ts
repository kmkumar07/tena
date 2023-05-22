import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansListingComponent } from './components/plans-listing/plans-listing.component';

const routes: Routes = [
  {path:'', component: PlansListingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }

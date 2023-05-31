import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansListingComponent } from './components/plans-listing/plans-listing.component';
import { ViewPlansComponent } from './components/view-plans/view-plans.component';
import { CreatePlanComponent } from './components/create-plan/create-plan.component';
import { SetPriceComponent } from './components/set-price/set-price.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
<<<<<<< HEAD
=======
import { AddOnsDetailsComponent } from './components/add-ons-details/add-ons-details.component';
>>>>>>> 304a29f75bc0d26e796da569095e24d161cca029

const routes: Routes = [
  { path: '', component: PlansListingComponent },
  { path: 'view', component: ViewPlansComponent },
  { path: 'create', component: CreatePlanComponent },
  { path: 'create/set-price', component: SetPriceComponent},
  { path: 'create/view-plans', component: ViewPlansComponent},
  { path: 'create/product-detail', component: ProductDetailsComponent},
  { path: 'Add-ons', component:AddOnsDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlansRoutingModule {}

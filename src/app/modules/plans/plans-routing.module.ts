import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansListingComponent } from './components/plans-listing/plans-listing.component';
import { ViewPlansComponent } from './components/view-plans/view-plans.component';
import { CreatePlanComponent } from './components/create-plan/create-plan.component';
import { SetPriceComponent } from './components/set-price/set-price.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AddOnsDetailsComponent } from './components/add-ons-details/add-ons-details.component';
import { FeatureDetailsPopupComponent } from 'src/app/shared/components/dialog-box/feature-details-popup/feature-details-popup.component';
import { EditProductDetailsComponent } from './components/edit-product-details/edit-product-details.component';
import { PlanDetailsComponent } from './components/plan-details/plan-details.component';


const routes: Routes = [
  { path: '', component: PlansListingComponent },
  { path: 'view/:id', component: ViewPlansComponent },
  { path: 'create', component: CreatePlanComponent },
  { path: 'create/plan-details', component: PlanDetailsComponent},
  { path: 'create/set-price', component: SetPriceComponent},
  { path: 'create/product-variant', component: ProductDetailsComponent},
  { path: 'create/edit-product-variant/:id', component: EditProductDetailsComponent},
  { path: 'create/:id', component: CreatePlanComponent },
  { path: 'create/set-price/:id', component: SetPriceComponent},
  { path: 'create/set-price/:id/:id', component: SetPriceComponent},
  { path: 'create/product-variant/:id', component: ProductDetailsComponent},
  { path: 'create/add-ons', component:AddOnsDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PlansRoutingModule {}

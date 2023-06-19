import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plans-routing.module';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { PlansListingComponent } from './components/plans-listing/plans-listing.component';
import { ViewPlansComponent } from './components/view-plans/view-plans.component';
import { PlanAddEmptyLayoutComponent } from './components/plan-add-empty-layout/plan-add-empty-layout.component';
import { CreatePlanComponent } from './components/create-plan/create-plan.component';
import { SetPriceComponent } from './components/set-price/set-price.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AddOnsDetailsComponent } from './components/add-ons-details/add-ons-details.component';
import { HttpClientModule } from '@angular/common/http';
import { EditProductDetailsComponent } from './components/edit-product-details/edit-product-details.component';

@NgModule({
  declarations: [
    PlansListingComponent,
    ViewPlansComponent,
    CreatePlanComponent,
    PlanAddEmptyLayoutComponent,
    SetPriceComponent,
    ProductDetailsComponent,
    AddOnsDetailsComponent,
    EditProductDetailsComponent
  ],
  imports: [
    CommonModule,
    PlansRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class PlansModule { }

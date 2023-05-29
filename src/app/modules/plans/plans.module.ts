import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plans-routing.module';
import { SideStepperComponent } from './components/side-stepper/side-stepper.component';

import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { PlansListingComponent } from './components/plans-listing/plans-listing.component';
import { ViewPlansComponent } from './components/view-plans/view-plans.component';
import { PlanAddEmptyLayoutComponent } from './components/plan-add-empty-layout/plan-add-empty-layout.component';
import { CreatePlanComponent } from './components/create-plan/create-plan.component';
import { SetPriceComponent } from './components/set-price/set-price.component';
import { AddPlanPricingComponent } from './components/create-plan/step/add-plan-pricing/add-plan-pricing.component';

@NgModule({
  declarations: [
    SideStepperComponent,
    PlansListingComponent,
    ViewPlansComponent,
    CreatePlanComponent,
    PlanAddEmptyLayoutComponent,
    SetPriceComponent,
    AddPlanPricingComponent
  ],
  imports: [
    CommonModule,
    PlansRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class PlansModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plans-routing.module';
import { PlansListingComponent } from './components/plans-listing/plans-listing.component';
import { ViewPlansComponent } from './components/view-plans/view-plans.component';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';

@NgModule({
  declarations: [
    PlansListingComponent,
    ViewPlansComponent
  ],
  imports: [
    CommonModule,
    PlansRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class PlansModule { }

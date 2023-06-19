import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CustomerViewComponent } from './customer/components/customer-view/customer-view.component';
import { CustomerListingComponent } from './customer/components/customer-listing/customer-listing.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';


@NgModule({
  declarations: [
    CustomerListingComponent,
    CustomerViewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    AngularMaterialModule
  ]
})
export class DashboardModule { }

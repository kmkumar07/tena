import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponsRoutingModule } from './coupons-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { ViewCouponsComponent } from './components/view-coupons/view-coupons.component';
import { CouponsListingComponent } from './components/coupons-listing/coupons-listing.component';
import { CreateCouponsComponent } from './components/create-coupons/create-coupons.component';

@NgModule({
  declarations: [
    ViewCouponsComponent,
    CouponsListingComponent,
    CreateCouponsComponent,
  ],
  imports: [
    CommonModule,
    CouponsRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    SharedModule,
  ],
})
export class CouponsModule {}

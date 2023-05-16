import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesListingComponent } from './features-listing/features-listing.component';
import { ViewFeatureComponent } from './view-feature/view-feature.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { FeaturesRoutingModule } from './features-routing.module';

@NgModule({
  declarations: [FeaturesListingComponent, ViewFeatureComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    AngularMaterialModule,
    SharedModule,
    FeaturesRoutingModule
  ],
})
export class FeaturesModule {
  constructor() {
    console.log('this is features module');
  }
}

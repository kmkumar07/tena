import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesListingComponent } from './components/features-listing/features-listing.component';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { CreateFeatureComponent } from './components/create-feature/create-feature.component';

@NgModule({
  declarations: [
    FeaturesListingComponent,
    CreateFeatureComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class FeaturesModule { 
  constructor(){
    console.log("this is features module")
  }
}

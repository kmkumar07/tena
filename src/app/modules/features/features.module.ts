import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesListingComponent } from './features-listing/features-listing.component';


@NgModule({
  declarations: [
    FeaturesListingComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule
  ]
})
export class FeaturesModule { 
  constructor(){
    console.log("this is features module")
  }
}

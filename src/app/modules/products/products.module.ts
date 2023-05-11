import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
@NgModule({
  declarations: [
    ProductListingComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    AngularMaterialModule
  ]
})
export class ProductsModule { 
  constructor(){
    console.log("this is products module")
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
@NgModule({
  declarations: [CreateProductComponent, ProductListingComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatButtonModule,
    MatIconModule,
    AngularMaterialModule,
  ],
})
export class ProductsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { DialogAnimationsDialog } from './create-product/create-product.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { ViewProductComponent } from './view-product/view-product.component';

@NgModule({
  declarations: [CreateProductComponent, ProductListingComponent, DialogAnimationsDialog, ViewProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatButtonModule,
    MatIconModule,
    AngularMaterialModule,
    SharedModule
  ],
})
export class ProductsModule {}

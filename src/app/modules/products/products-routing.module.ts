import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { CreateProductComponent } from './create-product/create-product.component';

const routes: Routes = [
  {
    path:'',
    component: ProductListingComponent
  },
  {
    path:'create-product',
    component: CreateProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListingComponent
  },
  {
    path: 'create',
    component: CreateProductComponent
  },

  {
    path: 'edit-product/:id',
    component: EditProductComponent
  },
  {
    path: 'view-product/:id',
    component: ViewProductComponent
  },
  {
    path: 'view-product',
    component: ViewProductComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import {
  CreateProductComponent
} from './components/create-product/create-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { HttpClientModule } from '@angular/common/http';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { MatFormFieldModule } from '@angular/material/form-field'; // Add this line
import { ProductsService } from './services/products.service';

@NgModule({
  declarations: [
    CreateProductComponent,
    ViewProductComponent,
    EditProductComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    AngularMaterialModule,
    SharedModule,
    MatDividerModule,
  ],
  providers: [ProductsService],
})
export class ProductsModule {}

import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createProductComponent } from './createProduct.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from 'src/app/core/layouts/sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';


@NgModule({
  declarations: [
    createProductComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [
    AngularMaterialModule,
    BrowserAnimationsModule,
    CommonModule,
    NgModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    NgxTippyModule,
    SharedModule,
    FormsModule,
    RouterTestingModule,
  ],
  exports: [createProductComponent],
})
export class SftCreateProductComponent {}

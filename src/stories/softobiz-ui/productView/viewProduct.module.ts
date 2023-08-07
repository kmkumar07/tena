import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { viewProductComponent } from './viewProduct.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { SftButtonModule } from '../button/button.module';

@NgModule({
  declarations: [
    viewProductComponent,
    ButtonComponent,
  ],
  imports: [
    AngularMaterialModule,
    BrowserAnimationsModule,
    CommonModule,
    NgModule,
    SftButtonModule
  ],
  exports: [viewProductComponent],
})
export class SftViewProductComponent {}

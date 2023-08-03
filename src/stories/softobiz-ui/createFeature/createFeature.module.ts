import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createFeatureComponent } from './createFeature.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { InputComponent } from '../Input/input.component';


@NgModule({
  declarations: [
    createFeatureComponent,
    InputComponent
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
  ],
  exports: [createFeatureComponent],
})
export class SftCreateFeatureComponent {}

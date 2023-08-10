import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createPlanComponent } from './createPlan.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { SidebarComponent } from 'src/app/core/layouts/sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { RouterTestingModule } from '@angular/router/testing';

@NgModule({
  declarations: [
    createPlanComponent,
    ButtonComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [
    AngularMaterialModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterTestingModule,
  ],
  exports: [createPlanComponent],
})
export class SftcreatePlanComponent {}

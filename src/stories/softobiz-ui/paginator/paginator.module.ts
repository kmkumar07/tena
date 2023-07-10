import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginatorComponent } from './paginator.component';
import { MatStepperModule } from '@angular/material/stepper';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatStepperModule,
    AngularMaterialModule
  ],
  declarations: [PaginatorComponent],
  exports: [PaginatorComponent],
})
export class SftPaginatorModule {}

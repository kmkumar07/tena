import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog.component';
import { MatStepperModule } from '@angular/material/stepper';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatStepperModule,
    AngularMaterialModule,
    MatButtonModule
  ],
  declarations: [DialogComponent],
  exports: [DialogComponent],
})
export class SftPaginatorModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breadcrumb } from './breadcrumb.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    BrowserAnimationsModule,
  ],
  declarations: [Breadcrumb],
  exports: [Breadcrumb],
})
export class SftBreadcrumbModule {}

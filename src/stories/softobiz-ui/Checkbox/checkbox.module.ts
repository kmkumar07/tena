import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [CommonModule, MatCheckboxModule],
  declarations: [CheckboxComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  exports: [CheckboxComponent],
})
export class SftCheckboxModule {}

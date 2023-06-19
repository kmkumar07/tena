import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './radio.component';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  imports: [CommonModule, MatRadioModule],
  declarations: [RadioButtonComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [RadioButtonComponent],
})
export class SftRadioButtonModule {}
 
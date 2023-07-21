import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchButtonComponent } from './switch.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [CommonModule, MatSlideToggleModule],
  declarations: [SwitchButtonComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [SwitchButtonComponent],
})
export class SftRadioButtonModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { ChipComponent } from './chip.component';

@NgModule({
  imports: [CommonModule, MatChipsModule],
  declarations: [ChipComponent],
  exports: [ChipComponent],
})
export class SftChipModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ChipComponent } from './chip.component';

@NgModule({
  imports: [CommonModule, MatChipsModule, MatIconModule],
  declarations: [ChipComponent],
  exports: [ChipComponent],
})
export class SftChipModule {}

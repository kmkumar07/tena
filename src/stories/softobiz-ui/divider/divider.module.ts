import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerComponent } from './divider.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';



@NgModule({
  imports: [CommonModule, MatDividerModule, MatListModule],
  declarations: [DividerComponent],
  exports: [DividerComponent],
})
export class SftDividerModule {}

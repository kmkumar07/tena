import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [CommonModule, MatTabsModule],
  declarations: [TabsComponent],
  exports: [TabsComponent],
})
export class SftTabsModule {}

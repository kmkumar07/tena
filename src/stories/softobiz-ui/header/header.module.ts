import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from '../profile/profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ProfileComponent, SearchbarComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MatMenuModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    MatChipsModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}

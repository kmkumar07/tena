import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { SftSearchbarModule } from '../searchbar/searchbar.module';
@NgModule({
  imports: [ 
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    AngularMaterialModule,
    MatTabsModule,
    MatChipsModule,
    SftSearchbarModule
  ],
  declarations: [HeaderComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [HeaderComponent],
})
export class SftHeaderModule {}

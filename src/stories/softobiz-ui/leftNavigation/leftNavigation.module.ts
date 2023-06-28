import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftNavigationComponent } from './leftNavigation.component';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from 'src/app/core/layouts/sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  declarations: [
    LeftNavigationComponent,
    SidebarComponent,
    HeaderComponent,
    ProfileComponent,
    SearchbarComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSidenavModule,
    MatTabsModule,
    MatChipsModule,
    // ActivatedRoute,
    MatSlideToggleModule,
    RouterTestingModule,
    MatListModule,
    MatButtonModule,
  ],
  exports: [LeftNavigationComponent],
})
export class LeftNavigationModule {}

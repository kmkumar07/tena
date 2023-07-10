import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboardLayout.component';
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
import { HeaderModule } from '../header/header.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { LeftNavigationComponent } from '../leftNavigation/leftNavigation.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [
    AngularMaterialModule,
    BrowserAnimationsModule,
    // SidebarComponent,
    // HeaderComponent,
    // ProfileComponent,
    // SearchbarComponent,
    RouterTestingModule,
    AngularMaterialModule
  ],
  exports: [DashboardLayoutComponent],
})
export class DashboardLayoutModule {}

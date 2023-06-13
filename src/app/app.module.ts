import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/modules/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/modules/shared/shared.module';
import { LayoutComponent } from './core/layouts/layout/layout.component';
import { SidebarComponent } from './core/layouts/sidebar/sidebar.component';
import { SuccessDialogComponent } from './shared/components/dialog-box/success-dialog/success-dialog.component';
import { DeleteConfirmationComponent } from './shared/components/dialog-box/delete-confirmation/delete-confirmation.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { FeatureDetailsPopupComponent } from './shared/components/dialog-box/feature-details-popup/feature-details-popup.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    SuccessDialogComponent,
    DeleteConfirmationComponent,
    PageNotFoundComponent,
    FeatureDetailsPopupComponent
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

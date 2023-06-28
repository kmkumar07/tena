import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
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
import { CouponsDeleteSuccessComponent } from './shared/components/dialog-box/coupons-delete-success/coupons-delete-success.component';
import { SignInComponent } from './modules/sign-in/components/sign-in.component';
import { SharedDataService } from './shared/sharedData.service';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    SuccessDialogComponent,
    DeleteConfirmationComponent,
    PageNotFoundComponent,
    FeatureDetailsPopupComponent,
    CouponsDeleteSuccessComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    SharedModule
  ],
  providers: [SharedDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

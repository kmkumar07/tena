import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomTranslateLoader } from './core/utils/functions/custom/custom-translate-loader';
import { ProductListingComponent } from './core/components/listings/product-listing/product-listing.component';
import { FeaturesListingComponent } from './core/components/listings/features-listing/features-listing.component';

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
    FormsModule,
    SharedModule,
    ProductListingComponent,
    FeaturesListingComponent,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [TranslateModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyListingComponent } from '../../components/empty-listing/empty-listing.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CustomDateHeaderComponent } from '../../components/custom-date-header/custom-date-header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EditCustomerDetailsComponent } from '../../components/dialog-box/edit-customer-details/edit-customer-details.component';
import { NoItemFoundComponent } from '../../components/no-item-found/no-item-found.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomTranslateLoader } from 'src/app/core/utils/functions/custom/custom-translate-loader';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  declarations: [
    EmptyListingComponent,
    CustomDateHeaderComponent,
    EditCustomerDetailsComponent,
    NoItemFoundComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule,
    ImageCropperModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    TranslateModule,
    NgxTippyModule,
    FormsModule,
    ReactiveFormsModule,
    EmptyListingComponent,
    CustomDateHeaderComponent,
    EditCustomerDetailsComponent,
    NoItemFoundComponent,
    HttpClientModule,
    MatSnackBarModule,
    ImageCropperModule,
    RouterModule
  ],
})
export class SharedModule {}

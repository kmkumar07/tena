import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyListingComponent } from '../../components/empty-listing/empty-listing.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CustomDateHeaderComponent } from '../../components/custom-date-header/custom-date-header.component';
import { HttpClientModule } from '@angular/common/http';
import { EditCustomerDetailsComponent } from '../../components/dialog-box/edit-customer-details/edit-customer-details.component';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { NoItemFoundComponent } from '../../components/no-item-found/no-item-found.component';

@NgModule({
  declarations: [EmptyListingComponent, CustomDateHeaderComponent, EditCustomerDetailsComponent, SnackBarComponent, NoItemFoundComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  exports: [
    NgxTippyModule,
    FormsModule,
    ReactiveFormsModule,
    EmptyListingComponent,
    CustomDateHeaderComponent,
    EditCustomerDetailsComponent,
    SnackBarComponent,
    NoItemFoundComponent
  ],
})
export class SharedModule {}

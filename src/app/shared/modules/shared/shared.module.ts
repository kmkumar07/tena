import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyListingComponent } from '../../components/empty-listing/empty-listing.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [EmptyListingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  exports: [
    NgxTippyModule,
    FormsModule,
    ReactiveFormsModule,
    EmptyListingComponent,
  ],
})
export class SharedModule {}

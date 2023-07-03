import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadLogoComponent } from './uploadLogo.component';
import { PortalModule } from '@angular/cdk/portal';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
@NgModule({
  declarations: [UploadLogoComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    PortalModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    AngularMaterialModule,
  ],
})
export class MenuModule {}

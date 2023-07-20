import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    AngularMaterialModule,
    // MatDialog,
    MatDialogModule,
    SharedModule
    // MatDialogRef,
  ],
  exports: [TableComponent],
})
export class TableModule {}

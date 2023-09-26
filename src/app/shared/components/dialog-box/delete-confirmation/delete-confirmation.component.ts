import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  module: string;
  deleteId: number;
}
@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
})
export class DeleteConfirmationComponent {
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  // dialogRef: any;

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}

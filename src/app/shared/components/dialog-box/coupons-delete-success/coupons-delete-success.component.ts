import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  module: string;
  deleteId: number;
}

@Component({
  selector: 'app-coupons-delete-success',
  templateUrl: './coupons-delete-success.component.html',
  styleUrls: ['./coupons-delete-success.component.scss']
})
export class CouponsDeleteSuccessComponent {
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialogRef: MatDialogRef<CouponsDeleteSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}

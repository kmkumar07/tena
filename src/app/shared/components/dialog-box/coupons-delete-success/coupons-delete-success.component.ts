import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  deleteId: number;
}

@Component({
  selector: 'app-coupons-delete-success',
  templateUrl: './coupons-delete-success.component.html',
  styleUrls: ['./coupons-delete-success.component.scss']
})
export class CouponsDeleteSuccessComponent {
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialogRef: MatDialogRef<CouponsDeleteSuccessComponent>) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}

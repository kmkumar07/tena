import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CouponsDeleteSuccessComponent } from 'src/app/shared/components/dialog-box/coupons-delete-success/coupons-delete-success.component';


export interface DialogData {
  deleteId: number;
}
@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    public dialog: MatDialog
  ) {}
  // dialogRef: any;

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
  onYesClick(): void {
    const dialogRef = this.dialog.open(CouponsDeleteSuccessComponent, {
      width: '422px',
      panelClass: 'dialog-curved',
    });
  }

}

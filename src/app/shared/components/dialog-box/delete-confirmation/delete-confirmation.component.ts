import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

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

  constructor(public dialogRef: MatDialogRef<DeleteConfirmationComponent>) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

}

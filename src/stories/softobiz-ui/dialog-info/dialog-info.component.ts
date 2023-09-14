import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/components/dialog-box/coupons-delete-success/coupons-delete-success.component';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss'],
})
export class DialogInfoComponent {
  @Input() withIcon: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogInfoComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  
  dialogRefYes: any;
  onYesClick() {
    this.dialogRefYes = this.dialog.open(DialogInfoDeleteSuccess, {
      panelClass: 'dialog-curved',
    });
    console.log('open');
  }
  
  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}


@Component({
  selector: 'dialog-info-success',
  templateUrl: './dialog-info-success.html',
})
export class DialogInfoDeleteSuccess {
  constructor(public dialogRef: MatDialogRef<DialogInfoDeleteSuccess>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}


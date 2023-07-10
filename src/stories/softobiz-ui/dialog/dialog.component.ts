import { Component, ViewEncapsulation } from '@angular/core';
import { DeleteConfirmationComponent } from '../../../app/shared/components/dialog-box/delete-confirmation/delete-confirmation.component';
import { DialogInfoComponent } from '../dialog-info/dialog-info.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'sft-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogComponent {
  dialogRef: any;
  constructor(public dialog: MatDialog) {}
  openDelete() {
    this.dialogRef = this.dialog.open(DialogInfoComponent, {
      width: '422px',
      panelClass: 'dialog-curved',
    });
    console.log('open');
  }
  
}

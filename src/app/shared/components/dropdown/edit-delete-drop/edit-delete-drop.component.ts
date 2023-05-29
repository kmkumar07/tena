import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../dialog-box/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-edit-delete-drop',
  templateUrl: './edit-delete-drop.component.html',
  styleUrls: ['./edit-delete-drop.component.scss'],
})
export class EditDeleteDropComponent {
  constructor(public dialog: MatDialog) {}
  openDelete() {
    this.dialog.open(DeleteConfirmationComponent, {
      width: '420px',
      panelClass: 'dialog-curved',
      // data: {
      //   module: 'Plan',
      // },
    });
  }
}

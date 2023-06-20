import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  type: 'general' | 'address' | 'other';
}

@Component({
  selector: 'app-edit-customer-details',
  templateUrl: './edit-customer-details.component.html',
  styleUrls: ['./edit-customer-details.component.scss'],
})
export class EditCustomerDetailsComponent {
  popupType: string;
  constructor(
    public dialogRef: MatDialogRef<EditCustomerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.popupType = data.type;
  }
}

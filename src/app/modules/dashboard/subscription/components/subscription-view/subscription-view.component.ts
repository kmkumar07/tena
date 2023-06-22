import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCustomerDetailsComponent } from 'src/app/shared/components/dialog-box/edit-customer-details/edit-customer-details.component';

@Component({
  selector: 'app-subscription-view',
  templateUrl: './subscription-view.component.html',
  styleUrls: ['./subscription-view.component.scss']
})
export class SubscriptionViewComponent {
  dialogRef: any;
  invoices: any[] = [{
    'id': 'SO - 001',
    'occurOn': 'Jan 09, 2023',
    'status': 'Paid',
    'paymentMethod': '2341',
    'amount': '899.00'
  }]
  activityLogs: any[] = [{
    'timeStamp': 'Aug 7th, 2022 9:09am',
    'events': 'Subscription has been created for the Plan Premium USD - Monthly.',
    'customerInfo': 'Greenplus Enterprises',
    'eventSource': 'Via Portal'
  }]
  invoiceCols: string[] = [
    'id',
    'occurOn',
    'status',
    'paymentMethod',
    'amount'
  ]
  logsCols: string[] = [
    'timeStamp',
    'events',
    'customerInfo',
    'eventSource'
  ]
  constructor(public dialog: MatDialog) {}
  openEdit(type: string) {
    this.dialogRef = this.dialog.open(EditCustomerDetailsComponent, {
      width: '29rem',
      panelClass: 'edit-customer',
      data: {
        type: type,
      },
    });
  }
}

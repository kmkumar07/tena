import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCustomerDetailsComponent } from 'src/app/shared/components/dialog-box/edit-customer-details/edit-customer-details.component';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss'],
})
export class CustomerViewComponent {
  dialogRef: any;
  customers: any[] = [{
    'subscriptionInfo': 'Premium USD (Monthly)',
    'id': 'SUB - 001',
    'state': 'Active',
    'createdOn': 'Jan 02, 2023',
    'activatedOn': 'Jan 10, 2023',
    'nextRenewal': 'Jan 10, 2023'
  }];
  transactions: any[] = [{
    'id': 'SO - 001',
    'occurOn': 'Jan 09, 2023',
    'status': 'Success',
    'type': 'Payment',
    'paymentMethod': '2341',
    'amount': '899.00'
  }]
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
  subscriptionCols: string[] = [
    'subscriptionInfo',
    'id',
    'state',
    'createdOn',
    'activatedOn',
    'nextRenewal'
  ];
  transactionCols: string[] = [
    'id',
    'occurOn',
    'status',
    'type',
    'paymentMethod',
    'amount'
  ];
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

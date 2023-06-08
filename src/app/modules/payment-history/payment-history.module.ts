import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentHistoryRoutingModule } from './payment-history-routing.module';
import { TransactionListComponent } from './transactions/components/transaction-list/transaction-list.component';
import { TransactionViewComponent } from './transactions/components/transaction-view/transaction-view.component';
import { LogsListComponent } from './logs/components/logs-list/logs-list.component';
import { LogViewComponent } from './logs/components/log-view/log-view.component';
import { InvoiceListComponent } from './invoices/components/invoice-list/invoice-list.component';
import { InvoiceViewComponent } from './invoices/components/invoice-view/invoice-view.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';


@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionViewComponent,
    LogsListComponent,
    LogViewComponent,
    InvoiceListComponent,
    InvoiceViewComponent
  ],
  imports: [
    CommonModule,
    PaymentHistoryRoutingModule,
    SharedModule,
    AngularMaterialModule
  ]
})
export class PaymentHistoryModule { }

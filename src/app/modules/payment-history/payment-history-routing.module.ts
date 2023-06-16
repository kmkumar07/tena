import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionListComponent } from './transactions/components/transaction-list/transaction-list.component';
import { TransactionViewComponent } from './transactions/components/transaction-view/transaction-view.component';
import { InvoiceListComponent } from './invoices/components/invoice-list/invoice-list.component';
import { InvoiceViewComponent } from './invoices/components/invoice-view/invoice-view.component';
import { LogsListComponent } from './logs/components/logs-list/logs-list.component';
import { LogViewComponent } from './logs/components/log-view/log-view.component';

const routes: Routes = [
  {
    path: 'transactions',
    component: TransactionListComponent,
  },
  {
    path: 'transactions/view',
    component: TransactionViewComponent,
  },
  {
    path: 'invoices',
    component: InvoiceListComponent
  },
  {
    path: 'invoices/view',
    component: InvoiceViewComponent
  },
  {
    path: 'logs',
    component: LogsListComponent
  },
  {
    path: 'logs/view',
    component: LogViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentHistoryRoutingModule {}

import { Component } from '@angular/core';
import { CustomDateHeaderComponent } from 'src/app/shared/components/custom-date-header/custom-date-header.component';


import {
  Logs_Data,
  logs,
  noLogs,
} from 'src/app/shared/constants/consants';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.scss']
})
export class LogsListComponent {
  displayedColumns: string[] = [
    'Timestamp',
    'Events',
    'Customer_Info',
    'Event_Source',
  ];
  LogsData: logs[] = Logs_Data;
  emptyCoupons = noLogs;
  customHeader = CustomDateHeaderComponent

}

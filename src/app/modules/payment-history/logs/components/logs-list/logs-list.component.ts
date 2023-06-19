import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CustomDateHeaderComponent } from 'src/app/shared/components/custom-date-header/custom-date-header.component';

import {
  Logs_Data,
  listFilterOptions,
  logs,
  noLogs,
} from 'src/app/shared/constants/consants';
import * as moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
class CustomDateAdapter extends MomentDateAdapter {
  override getDayOfWeekNames(style: 'long' | 'short' | 'narrow') {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }
  override getFirstDayOfWeek(): number {
    return 1;
  }
}

export const MATERIAL_DATEPICKER_FORMATS = {
  parse: {
    dateInput: 'DD/MMM/YYYY',
  },
  display: {
    dateInput: 'DD/MMM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MMM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },

    { provide: MAT_DATE_FORMATS, useValue: MATERIAL_DATEPICKER_FORMATS },
  ],
})
export class LogsListComponent {
  isOpened: boolean = false;
  displayedColumns: string[] = [
    'Timestamp',
    'Events',
    'Customer_Info',
    'Event_Source',
  ];
  LogsData: logs[] = Logs_Data;
  emptyCoupons = noLogs;
  filterOptions: string[] = listFilterOptions;
  customHeader = CustomDateHeaderComponent;
  startDate: Date;
  endDate: Date;
  preventClose(event: any) {
    event.stopPropagation();
  }
  setFilter(selectedOption: string) {
    console.log(selectedOption, 'this is the selected option');
  }
  openDatePicker(event: MatTabChangeEvent): void {
    const selectedTab = event.index;
    console.log(selectedTab, 'check');
    if (selectedTab === 1) {
      this.isOpened = true;
    }
  }
  handleDateRangeSelection(): void {
    console.log(this.selectedDates, 'test date');
    if (this.selectedDates.length === 2) {
      this.startDate = this.selectedDates[0];
      this.endDate = this.selectedDates[1];
      console.log(this.startDate, 'start date');
      console.log(this.endDate, 'end date');
    }
  }
  get selectedDates(): Date[] {
    return [this.startDate, this.endDate];
  }
}

import { Component } from '@angular/core';
import * as moment from 'moment';
import { CustomDateHeaderComponent } from 'src/app/shared/components/custom-date-header/custom-date-header.component';
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
  selector: 'app-create-coupons',
  templateUrl: './create-coupons.component.html',
  styleUrls: ['./create-coupons.component.scss'],
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
export class CreateCouponsComponent {
  customHeader = CustomDateHeaderComponent;
}

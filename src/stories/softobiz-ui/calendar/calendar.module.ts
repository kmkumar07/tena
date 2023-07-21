import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { CalendarComponent } from './calendar.component';
import { CustomDateHeaderComponent } from 'src/app/shared/components/custom-date-header/custom-date-header.component';
import { MatTabsModule } from '@angular/material/tabs';
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/

@NgModule({
  imports: [  
    CommonModule,
    MatDatepickerModule,
    FormsModule,
    FormGroup,
    FormControl,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatDatepickerInputEvent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatNativeDateModule,
    CustomDateHeaderComponent,
    MatFormFieldModule,
    MatTabsModule
  ],
  declarations: [CalendarComponent],
  exports: [CalendarComponent, MatDatepickerModule],
  // providers: [
  //   // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
  //   // application's root module. We provide it at the component level here, due to limitations of
  //   // our example generation script.
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  //   },
  // ],
})
export class SftCalendarModule {}

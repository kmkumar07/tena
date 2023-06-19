import { Component, Input } from '@angular/core';
import { CustomDateHeaderComponent } from 'src/app/shared/components/custom-date-header/custom-date-header.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  customHeader = CustomDateHeaderComponent
}

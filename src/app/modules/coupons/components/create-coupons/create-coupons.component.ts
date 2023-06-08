import { Component } from '@angular/core';
import { CustomDateHeaderComponent } from 'src/app/shared/components/custom-date-header/custom-date-header.component';

@Component({
  selector: 'app-create-coupons',
  templateUrl: './create-coupons.component.html',
  styleUrls: ['./create-coupons.component.scss'],
})
export class CreateCouponsComponent {
  customHeader = CustomDateHeaderComponent
}

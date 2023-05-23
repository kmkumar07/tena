import { Component } from '@angular/core';
import { plan_add_empty_data } from 'src/app/shared/constants/consants';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.scss']
})
export class CreatePlanComponent {
  planAddEmptyData = plan_add_empty_data;
}

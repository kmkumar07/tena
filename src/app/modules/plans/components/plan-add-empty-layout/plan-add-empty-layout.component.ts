import { Component } from '@angular/core';
import { plan_add_empty_data } from 'src/app/shared/constants/consants';

@Component({
  selector: 'app-plan-add-empty-layout',
  templateUrl: './plan-add-empty-layout.component.html',
  styleUrls: ['./plan-add-empty-layout.component.scss']
})
export class PlanAddEmptyLayoutComponent {
  planAddEmptyData = plan_add_empty_data;
}

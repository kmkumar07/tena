import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeatureDetailsPopupComponent } from 'src/app/shared/components/dialog-box/feature-details-popup/feature-details-popup.component';
import { plan_add_empty_data } from 'src/app/shared/constants/consants';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.scss']
})
export class CreatePlanComponent {
  planAddEmptyData = plan_add_empty_data;
  constructor(public dialog: MatDialog) {}
  openPopup(){
    this.dialog.open(FeatureDetailsPopupComponent, {
    });
  }
}

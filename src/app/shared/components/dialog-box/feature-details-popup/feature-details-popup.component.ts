import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureService } from 'src/app/modules/features/services/feature.service';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  featureId: string;
  featureName: string;
  featureType: string;
  entitlement: string;
  status: string;
}
@Component({
  selector: 'app-feature-details-popup',
  templateUrl: './feature-details-popup.component.html',
  styleUrls: ['./feature-details-popup.component.scss'],
})
export class FeatureDetailsPopupComponent implements OnInit {
  featureDetails: any;
  constructor(
    private featureService: FeatureService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.featureService
      .getFeatureById(this.data.featureId['featureId'])
      .subscribe((res) => {
        this.featureDetails = res;

        this.data.featureName = this.featureDetails?.name;
        this.data.featureType = this.featureDetails?.type;
        this.data.status = this.featureDetails?.status;

        if (this.data.featureType === 'switch') {
          this.data.entitlement = 'OFF';
        } else if (this.data.featureType === 'quantity') {
          this.data.entitlement = 'ON';
        }
      });
  }

  closePopup() {
    this.dialog.closeAll();
  }

  editFeature() {
    this.router.navigate([
      `/features/edit-feature/${this.data.featureId['featureId']}`,
    ]);
    this.dialog.closeAll();
  }
}

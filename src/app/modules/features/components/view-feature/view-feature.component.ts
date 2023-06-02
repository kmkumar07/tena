import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureService } from '../../services/feature.service';

export interface PeriodicElement {
  name: string;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', weight: 1.0079 },
  { name: 'Helium', weight: 4.0026 },
];

const FEATURE_TYPE = 'custom';

@Component({
  selector: 'app-view-feature',
  templateUrl: './view-feature.component.html',
  styleUrls: ['./view-feature.component.scss'],
})
export class ViewFeatureComponent implements OnInit {
  displayedColumns: string[] = ['name', 'weight'];
  dataSource = ELEMENT_DATA;
  featureType = FEATURE_TYPE;
  clickedRows = new Set<PeriodicElement>();
  featureDetails: any;
  productName: string = 'Microsoft Teams';
  featureName: string;
  featureValue: string;
  description: string;
  unit: string;
  status: string;
  id: string;
  levelsArray: any = [];
  isUnlimited: string;
  displayName: string;
  displayNameArray: any = [];
  level: number;
  value: string;

  constructor(
    private featureService: FeatureService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.featureService.getFeatureById(this.id).subscribe((res) => {
      this.featureDetails = res;
      this.featureName = this.featureDetails?.name;
      this.featureValue = this.featureDetails?.type;
      this.status = this.featureDetails?.status;
      this.description = this.featureDetails?.description;
      this.unit = this.featureDetails?.unit;
      this.levelsArray = Object.values(this.featureDetails?.levels)
      this.levelsArray.forEach((data: any, index: number)=>{
        this.isUnlimited = data.isUnlimited
        this.displayName = data.displayName
        this.level = data.level
        this.value = data.value
        this.displayNameArray[index] = this.displayName
      })
    });
  }

  editFeature() {
    this.router.navigate([`/features/edit-feature/${this.id}`]);
  }
}

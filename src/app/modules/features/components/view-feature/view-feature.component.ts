import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureService } from '../../services/feature.service';
import { environment } from 'src/environments/environment';

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
  featureTypes = FEATURE_TYPE;
  clickedRows = new Set<PeriodicElement>();
  featureDetails: any;
  productName: string;
  productStatus: string;
  productId: string;
  featureName: string;
  featureType: string;
  description: string;
  unit: string;
  status: string;
  id: string;
  levelsArray: any = [];
  isUnlimited: string;
  displayName: string;
  displayNameArray: any = [];
  valueArray: any = [];
  level: number;
  value: string;
  createdOn: string;
  modifiedOn: string;
  featureId: string;
  valueOne: string;
  valueTwo: string;
  imageUrl: string;
  imagePath: string;
  environment = environment;

  constructor(
    private featureService: FeatureService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.featureService.getFeatureById(this.id).subscribe((res) => {
      this.featureDetails = res;
      const featureData = res.data;

      this.featureName = featureData.name;
      this.featureId = featureData.featureId;
      this.featureType = featureData.type;
      this.status = featureData.status;
      this.description = featureData.description || '';
      this.unit = featureData.unit;
      this.productId = featureData.product.productId;
      this.productName = featureData.product.name;
      this.createdOn = featureData.createdOn;
      this.modifiedOn = featureData.modifiedOn;
      this.levelsArray = Object.values(featureData.levels);
      this.levelsArray.forEach((data: any, index: number) => {
        this.isUnlimited = data.isUnlimited;
        this.displayName = data.name;
        this.level = data.level;
        this.value = data.value;
        this.valueArray[index] = this.value;
        this.valueOne = this.valueArray[0];
        this.valueTwo = this.valueArray[1];
        this.displayNameArray[index] = this.displayName;
      });
    });
  }

  editFeature() {
    this.router.navigate([`/features/edit-feature/${this.id}`]);
  }
}

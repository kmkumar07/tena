import { Component } from '@angular/core';

export interface PeriodicElement {
  name: string;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', weight: 1.0079 },
  { name: 'Helium', weight: 4.0026 },
];

@Component({
  selector: 'app-view-feature',
  templateUrl: './view-feature.component.html',
  styleUrls: ['./view-feature.component.scss'],
})
export class ViewFeatureComponent {
  displayedColumns: string[] = ['name', 'weight'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
}

import { Component } from '@angular/core';
import { noPageFound } from '../shared/constants/consants';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  constructor() {}
  emptyData = noPageFound;
}

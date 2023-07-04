import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-listing',
  templateUrl: './empty-listing.component.html',
  styleUrls: ['./empty-listing.component.scss']
})
export class EmptyListingComponent {
  @Input() items: any;
  constructor(){}
}

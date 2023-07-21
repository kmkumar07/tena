import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'sft-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchbarComponent {
  @Input() placeholder: string = 'Enter here...';

  @Input() disable: boolean = false;
}

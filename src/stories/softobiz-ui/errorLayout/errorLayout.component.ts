import { Component , Input } from '@angular/core';

@Component({
  selector: 'sft-errorLayout',
  templateUrl: './errorLayout.component.html',
  styleUrls: ['./errorLayout.component.scss']
})
export class ErrorLayoutComponent {
  @Input() imgUrl: string = '';
  @Input() subHeader: string = '';
  @Input() details: string = '';
}

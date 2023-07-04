import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-Tooltip',
  templateUrl: './Tooltip.component.html',
  styleUrls: ['./Tooltip.component.scss']
})
export class TooltipComponent {
  
  @Input() infoTitle: string = '';
  @Input() infoDetail: string = '';

}

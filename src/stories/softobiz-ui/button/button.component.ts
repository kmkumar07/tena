import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'sft-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {

  /**
   * HTML Aria label.
   */
  @Input() ariaLabel?: string;

  /**
   * HTML Aria labbeled by.
   */
  @Input() ariaLabelledBy?: string;

  @Input() label: string = 'button';

  @Input() color: ThemePalette = 'primary';

  @Input() variant: any = 'default';

  @Input() disable = false;

  @Input() disableRipple = false;

  @Input() size: string ='medium';

  @Input() type: string ='';

  @Input() class: string ='';
  
  @Input() id: string ='';
  
  /**
   * clickfuntion().
   */
  @Input() onClick: string ='clickfuntion()';
}

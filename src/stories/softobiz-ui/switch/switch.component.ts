import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'sft-switch-button',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SwitchButtonComponent {

  //Checkbox label
  @Input() label: string = '';

  //Whether the checkbox is disabled.
  @Input() disable = false;

  //Whether the checkbox is checked.
  @Input() checked: boolean = false;
  
  //Theme color palette for the component
  @Input() color: ThemePalette;

  //Whether ripples are disabled
  @Input() disableRipple: boolean = false;

  //Whether the checkbox is indeterminate
  @Input() indeterminate: boolean = false;

  // Whether the label should appear after or before the checkbox. Defaults to 'after'
  @Input() labelPosition: 'before' | 'after' = 'after';

}

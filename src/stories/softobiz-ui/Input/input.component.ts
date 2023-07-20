import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
// import { ButtonVariant } from './types';

@Component({
  selector: 'sft-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss', '../../../themes/dark.scss'],
  encapsulation: ViewEncapsulation.None, 
})
export class InputComponent {
  @Input() label: string = 'Label';

  @Input() readonly: boolean = false;

  @Input() type: string;

  @Input() placeholder: string = 'Enter here...';

  @Input() hint?: string = '';

  @Input() disable: boolean = false;

  @Input() required: boolean = false;

  @Input() infoIcon: boolean = false;

  @Input() infoTitle: string = '';

  @Input() infoDetail: string = '';

  @Input() value: string = '';

  @Input() class: string = '';

  errorState: boolean;
}

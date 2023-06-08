import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
// import { ButtonVariant } from './types';

@Component({
  selector: 'sft-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TextareaComponent {
  @Input() label: string = 'Label';

  @Input() readonly: boolean = false;

  @Input() type: string;

  @Input() placeholder: string = 'Enter here...';

  @Input() formControlName: string = '';

  @Input() hint?: string = '';

  @Input() disable: boolean = false;

  @Input() required: boolean = false;

  @Input() infoIcon: boolean = false;

  @Input() value: string = '';

  @Input() class: string = '';

  @Input() id: string = '';

  @Input() rows: number ;

  

  errorState: boolean;
}

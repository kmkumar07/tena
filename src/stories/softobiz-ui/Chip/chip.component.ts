import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'sft-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChipComponent {
  @Input() label: string = 'Chip';

  @Input() ariaDescription: string | null = '';

  @Input() ariaLabel: string | null = '';

  @Input() disableRipple: boolean = false;

  @Input() disabled: boolean = false;

  @Input() highlighted: boolean = true;

  @Input() class: string = '';

  @Input() id: string = '';

  @Input() withIcon: boolean = false;

}

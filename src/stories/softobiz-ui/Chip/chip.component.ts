import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'sft-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChipComponent {
  @Input() label: string = 'One fish';

  @Input() color: ThemePalette = 'primary';

  @Input() ariaDescription: string | null = '';

  @Input() ariaLabel: string | null = '';

  @Input() disableRipple: boolean = false;

  @Input() disabled: boolean = false;

  @Input() highlighted: boolean = false;

  @Input() id: string = '';

  @Input() removable: boolean = false;

  @Input() role: string | null = '';

  @Input() value: any;
}

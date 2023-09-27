import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-custom',
  templateUrl: './snack-bar-custom.component.html',
  styleUrls: ['./snack-bar-custom.component.scss'],
})
export class SnackBarCustomComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}

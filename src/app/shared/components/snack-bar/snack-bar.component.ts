import { Component } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {

  constructor(){}
  isOpen: boolean = false;
  message: string = '';

  open(message: string, config: MatSnackBarConfig) {
    this.message = message;
    this.isOpen = true;
    setTimeout(() => {
      this.close();
    }, config.duration);
  }

  close() {
    this.isOpen = false;
  }
}

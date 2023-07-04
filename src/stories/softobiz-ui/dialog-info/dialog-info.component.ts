import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss']
})
export class DialogInfoComponent {
  
  @Input() withIcon: boolean = false;

}

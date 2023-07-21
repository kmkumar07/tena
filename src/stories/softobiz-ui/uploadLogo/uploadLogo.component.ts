import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-uploadLogo',
  templateUrl: './uploadLogo.component.html',
  styleUrls: ['./uploadLogo.component.scss']
})
export class UploadLogoComponent {
  
  @Input() withIcon: boolean = false;

}

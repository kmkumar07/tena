import { Component, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { Notifications_Data } from 'src/app/shared/constants/consants';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'sft-header-button',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  notificationsData = Notifications_Data;
  constructor() {}

  @ViewChild('sidenav') sidenav: MatSidenav;

  opened: boolean = true;
  toggleSidenav(event: any) {
    this.sidenav.toggle();
    this.opened = event;
  }

  // getList(item: string) {
  //   let list = [];
  //   return (list = this.menuItems.filter((ele) => ele.category == item));
  // }
  preventClose(event: any) {
    event.stopPropagation();
  }
}

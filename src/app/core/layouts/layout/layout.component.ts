import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {
  Config_Menu,
  MENUITEMS,
  User_Options,
  Menu_Headings,
  Notifications_Data,
} from 'src/app/shared/constants/consants';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  menuItems = MENUITEMS;
  configOptions = Config_Menu;
  Menu_Headings = Menu_Headings;
  userProfile = User_Options;
  notificationsData = Notifications_Data;
  constructor() {
    console.log('1234', this.opened);
  }

  @ViewChild('sidenav') sidenav: MatSidenav;

  opened: boolean = true;
  toggleSidenav(event: any) {
    this.sidenav.toggle();
    this.opened = event;
  }

  getList(item: string) {
    let list = [];
    return (list = this.menuItems.filter((ele) => ele.category == item));
  }
  preventClose(event: any) {
    event.stopPropagation();
  }
}

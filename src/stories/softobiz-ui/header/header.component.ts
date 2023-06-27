import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MENUITEMS, Config_Menu, Menu_Headings, User_Options, Notifications_Data } from 'src/app/shared/constants/consants';
@Component({
  selector: 'sft-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuItems = MENUITEMS;
  configOptions = Config_Menu;
  Menu_Headings = Menu_Headings;
  userProfile = User_Options;
  notificationsData = Notifications_Data;
  constructor() {}

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

import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {
  Config_Menu,
  MENUITEMS,
  User_Options,
  Menu_Headings,
} from 'src/app/shared/constants/consants';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  menuItems = MENUITEMS;
  userProfile = User_Options;
  configOptions = Config_Menu;
  Menu_Headings = Menu_Headings;
  constructor() {}

  @ViewChild('sidenav') sidenav: MatSidenav;
  opened: boolean = true;
  toggleSidenav() {
    this.sidenav.toggle();
    this.opened = !this.opened;
  }
  getList(item: string) {
    let list = [];
    return (list = this.menuItems.filter((ele) => ele.category == item));
  }
  preventClose(event: any) {
    event.stopPropagation();
  }
}

import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { GlobalService } from 'src/app/core/services/global.service';
import { MENUITEMS, Config_Menu, Menu_Headings, User_Options, Notifications_Data } from 'src/app/shared/constants/consants';
@Component({
  selector: 'sft-dashboardLayout',
  templateUrl: './dashboardLayout.component.html',
  styleUrls: ['./dashboardLayout.component.scss']
})
export class DashboardLayoutComponent {
  // menuItems = MENUITEMS;
  // configOptions = Config_Menu;
  // Menu_Headings = Menu_Headings;
  // userProfile = User_Options;
  // notificationsData = Notifications_Data;
  // constructor() {}

  // @ViewChild('sidenav') sidenav: MatSidenav;

  // opened: boolean = true;
  // toggleSidenav(event: any) {
  //   this.sidenav.toggle();
  //   this.opened = event;
  // }

  // getList(item: string) {
  //   let list = [];
  //   return (list = this.menuItems.filter((ele) => ele.category == item));
  // }
  // preventClose(event: any) {
  //   event.stopPropagation();
  // }
  menuItems = MENUITEMS;
  configOptions = Config_Menu;
  Menu_Headings = Menu_Headings;
  userProfile = User_Options;
  notificationsData = Notifications_Data;
  activeRoute: string[];
  currentRoute: string;

  constructor(
    public globalService: GlobalService,
    private router: Router,
    public route: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
        this.activeRoute = this.currentRoute.split('/')
      });
  }

  @ViewChild('sidenav') sidenav: MatSidenav;
  @Output() newItemEvent = new EventEmitter<boolean>();

  opened: boolean = true;
  toggleSidenav() {
    this.sidenav.toggle();
    this.opened = !this.opened;
    this.newItemEvent.emit(this.opened);
  }
  getList(item: string) {
    let list = [];
    return (list = this.menuItems.filter((ele) => ele.category == item));
  }
}

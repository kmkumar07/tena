import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
// import { GlobalService } from 'src/app/core/services/global.service';
import { MENUITEMS, Config_Menu, Menu_Headings, User_Options, Notifications_Data, User_Data, Data_Type } from 'src/app/shared/constants/consants';
@Component({
  selector: 'sft-productList',
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.scss']
})
export class productListComponent {

  preventClose(event: any) {
    event.stopPropagation();
  }
  menuItems = MENUITEMS;
  configOptions = Config_Menu;
  Menu_Headings = Menu_Headings;
  userProfile = User_Options;
  notificationsData = Notifications_Data;
  activeRoute: string[];
  currentRoute: string;

  constructor(
    // public globalService: GlobalService,
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
    // this.sidenav.toggle();
    this.opened = !this.opened;
    this.newItemEvent.emit(this.opened);
  }
  getList(item: string) {
    let list = [];
    return (list = this.menuItems.filter((ele) => ele.category == item));
  }
  switchDark(event: any) {
    const body = document.getElementById('storybook-root');
    body.classList.toggle('dark-mode');
  }
  isOpened: boolean = false;
  displayedColumns1: string[] = [
    'productId',
    'name',
    'feature',
    'created_at',
    'status',
    'action',
  ];
  ProductData: Data_Type[] = User_Data;
}

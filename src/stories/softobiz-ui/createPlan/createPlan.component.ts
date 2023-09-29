import { Component ,  EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
// import { MENUITEMS, Config_Menu, Menu_Headings, User_Options, Notifications_Data } from 'src/app/shared/constants/consants';
import { MENUITEMS, Config_Menu, Menu_Headings, User_Options, Notifications_Data } from '../../../app/shared/constants/consants';
// import { GlobalService } from 'src/app/core/services/global.service';
// import { GlobalService } from '../../../../src/app/core/services/global.service';


export interface PeriodicElement {
  PricingCycle: string;
  Price: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { PricingCycle: 'Daily', Price: 'Set Price' },
  { PricingCycle: 'Weekly', Price: 'Set Price' },
  { PricingCycle: 'Monthly', Price: 'Set Price' },
  { PricingCycle: 'Yearly', Price: 'Set Price' },
];


@Component({
  selector: 'sft-createPlan',
  templateUrl: './createPlan.component.html',
  styleUrls: ['./createPlan.component.scss']
})
export class createPlanComponent {
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
  displayedColumns: string[] = ['PricingCycle', 'Price'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();

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
}

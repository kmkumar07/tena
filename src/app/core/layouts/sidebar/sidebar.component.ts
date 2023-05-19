import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import {
  Config_Menu,
  MENUITEMS,
  User_Options,
  Menu_Headings,
  Notifications_Data,
} from 'src/app/shared/constants/consants';
import { GlobalService } from '../../services/global.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menuItems = MENUITEMS;
  configOptions = Config_Menu;
  Menu_Headings = Menu_Headings;
  userProfile = User_Options;
  notificationsData = Notifications_Data;
  activateRoute = ''
  constructor(
    public globalService: GlobalService,
    private router: Router,
    public route: ActivatedRoute
  ) {
    // this.router.events
    //   .pipe(takeUntil(this.globalService.componentDestroyed(this)))
    //   .subscribe((val) => {
    //     if (val instanceof NavigationEnd) {
    //       this.activateRoute = this.globalService.isRouteActive(
    //         val.urlAfterRedirects.split('/')
    //       );
          
    //     }
    //   });
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
}

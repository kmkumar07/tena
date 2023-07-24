import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  Config_Menu,
  MENUITEMS,
  User_Options,
  Menu_Headings,
  Notifications_Data,
} from 'src/app/shared/constants/consants';
import { GlobalService } from '../../services/global.service';
import { filter } from 'rxjs/operators';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';

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
  activeRoute: string[];
  currentRoute: string;

  constructor(
    public globalService: GlobalService,
    private router: Router,
    public route: ActivatedRoute,
    private translate: TranslateService, 
    private translateLoader: TranslateLoader
  ) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
        this.activeRoute = this.currentRoute.split('/')
      });
    translate.addLangs(["en", "es"]);
    translate.setDefaultLang("en");
    translate.use("en");
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

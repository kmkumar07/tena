import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {
  Config_Menu,
  MENUITEMS,
  User_Options,
  Menu_Headings,
  Notifications_Data,
} from 'src/app/shared/constants/consants';
import { GlobalService } from '../../services/global.service';
import { takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { kratosService } from 'src/app/modules/sign-in/services/kratos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  loading: boolean = false;
  userName:string
  constructor(
    private snackBar: MatSnackBar,
    private kratos: kratosService,
    private global: GlobalService,
    public dialog: MatDialog

  ) {}

  @ViewChild('sidenav') sidenav: MatSidenav;

  ngOnInit() {
    this.global
      .loaderStatus()
      .pipe(takeUntil(this.global.componentDestroyed(this)))
      .subscribe((res) => (this.loading = res));
    const session = JSON.parse(window.localStorage.getItem('session'));
    this.userName = session.identity.traits.name.first + " " +session.identity.traits.name.last
 
  }

  opened: boolean = true;
  toggleSidenav(event: any) {
    this.sidenav.toggle();
    this.opened = event;
  }
  getInitials(userName: string): string {
    const names = userName.split(' ');
    const firstNameInitial = names[0].charAt(0).toUpperCase();
    const lastNameInitial = names[1].charAt(0).toUpperCase();
    return `${firstNameInitial}${lastNameInitial}`;
  }
  getList(item: string) {
    let list = [];
    return (list = this.menuItems.filter((ele) => ele.category == item));
  }
  preventClose(event: any) {
    event.stopPropagation();
  }
  logOut(status) {
    this.global.showLoader()
    if (status) {
      this.kratos.logout().subscribe(
        {
          next: (res) => {
            this.global.hideLoader()
          },
          error: (error: any) => {
            console.error('Error during logout:', error);
            this.snackBar.open(error.message, '', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            })
          },
        }
      )
    }
  }
  switchDark(event: any) {
    const body = document.getElementById('root');
    body.classList.toggle('dark-mode');
  }
}

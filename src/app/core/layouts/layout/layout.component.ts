import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Config_Menu, MENUITEMS, User_Options } from 'src/app/shared/constants/consants';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit{
  menuItems = MENUITEMS
  userProfile = User_Options
  configOptions = Config_Menu
  constructor(){}
  
  @ViewChild('sidenav') sidenav: MatSidenav;
  opened: boolean = true
  toggleSidenav() {
    this.sidenav.toggle();
    this.opened = !this.opened
  }
  ngOnInit(){
    console.log('this is rendered!', this.menuItems)
  } 
}

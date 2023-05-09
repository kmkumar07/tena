import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuItems } from 'src/app/shared/components/menu-items/menu-items';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit{
  @ViewChild('sidenav') sidenav: MatSidenav;
  opened: boolean = true
  toggleSidenav() {
    this.sidenav.toggle();
    this.opened = !this.opened
  }
  ngOnInit(){
    console.log('this is rendered!')
  }
}

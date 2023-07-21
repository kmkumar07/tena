import { Component } from '@angular/core';
import { GlobalService } from './core/services/global.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tenant-portal';
  constructor() {}
  ngOnInit(){
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private globalService: GlobalService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = this.globalService.isUserAuthenticated();

    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}

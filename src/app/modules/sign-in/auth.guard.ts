import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.isUserAuthenticated();
    const currentUrlState = state.url;

    if (isAuthenticated && currentUrlState.includes('sign-in')) {
      this.router.navigate(['/']);
      return false;
    }

    if (!isAuthenticated && !currentUrlState.includes('sign-in')) {
      this.router.navigate(['/sign-in']);
      return false;
    }

    return true;
  }

  private isUserAuthenticated(): boolean {
    const session = window.localStorage.getItem('session');
    return session !== null;
  }
}

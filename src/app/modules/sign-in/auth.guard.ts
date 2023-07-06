import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if the session is valid
    const session = window.localStorage.getItem('session');
    if (session !== null) {
      return true;
    } else {
      // Redirect the user to the sign-in page 
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}

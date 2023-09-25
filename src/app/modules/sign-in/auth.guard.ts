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
    const currentUrlState = state.url;
    console.log("first",currentUrlState)
    if (session !== null) {
      if (currentUrlState.includes('sign-in')) {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }    
    } else {
      // Redirect the user to the sign-in page 
      if (currentUrlState.includes('sign-in')) {
        return true;
      }
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}

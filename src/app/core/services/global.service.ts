import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { StaticRoutes } from 'src/app/shared/constants/consants';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  staticRoutes: any = StaticRoutes;
  public isLoading = new BehaviorSubject<boolean>(false);
  public isDarkMode = new BehaviorSubject<boolean>(false);
  constructor() {}

  // loader operations
  showLoader() {
    this.isLoading.next(true);
  }
  hideLoader() {
    this.isLoading.next(false);
  }
  loaderStatus() {
    return this.isLoading.asObservable();
  }

  isRouteActive(routeSteps: any) {
    if (routeSteps.length >= 4) {
      for (let obj in this.staticRoutes) {
        if (this.staticRoutes[obj].indexOf(routeSteps[3]) >= 0) {
          return obj;
        }

        if (this.staticRoutes[obj].indexOf(routeSteps[4]) >= 0) {
          return obj;
        }
      }
      return '';
    } else {
      return '';
    }
  }

  componentDestroyed(component: any) {
    const oldNgOnDestroy = component.ngOnDestroy;
    const destroyed$ = new ReplaySubject<void>(1);
    component.ngOnDestroy = () => {
      oldNgOnDestroy.apply(component);
      destroyed$.next(undefined);
      destroyed$.complete();
    };
    return destroyed$;
  }
  isUserAuthenticated(): boolean {
    const session = window.localStorage.getItem('session');
    return session !== null;
  }
}

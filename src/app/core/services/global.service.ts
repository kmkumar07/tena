import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { StaticRoutes } from 'src/app/shared/constants/consants';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  staticRoutes: any = StaticRoutes;
  constructor() {}

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
    const destroyed$ = new ReplaySubject<void>(1);

    if (component.subscriptionsAll) {
      component.subscriptionsAll.push(destroyed$);
    }
    return destroyed$;
  }
}

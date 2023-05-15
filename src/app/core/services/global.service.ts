import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }
  preventClose(event: any) {
    event.stopPropagation();
  }
}

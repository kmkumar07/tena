import { Injectable } from '@angular/core';

export class PlanValue {
  planId: string;
  externalName: string;
}

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

   planValue: PlanValue = new PlanValue();
 
  
 
  constructor() { }

  setplanValue(planId: string,externalName:string) {
    this.planValue.planId = planId;
    this.planValue.externalName=externalName    
  }

  getplanValue() {
    return this.planValue;
  }}

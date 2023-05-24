import { Component, ViewChild } from '@angular/core';
import { MatStep } from '@angular/material/stepper';

@Component({
  selector: 'app-side-stepper',
  templateUrl: './side-stepper.component.html',
  styleUrls: ['./side-stepper.component.scss']
})
export class SideStepperComponent {
  @ViewChild('stepper') stepper: MatStep;
  isLinear = false;
  ngOnInit() {
    console.log(this.stepper, 'jbjbd');
  }
}

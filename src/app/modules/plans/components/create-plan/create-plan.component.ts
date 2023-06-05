import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeatureDetailsPopupComponent } from 'src/app/shared/components/dialog-box/feature-details-popup/feature-details-popup.component';
import {
  Stepper,
  plan_add_empty_data,
} from 'src/app/shared/constants/consants';

export interface PeriodicElement {
  PricingCycle: string;
  Price: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { PricingCycle: 'Daily', Price: 'Set Price' },
  { PricingCycle: 'Weekly', Price: 'Set Price' },
  { PricingCycle: 'Monthly', Price: 'Set Price' },
  { PricingCycle: 'Yearly', Price: 'Set Price' },
];

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.scss'],
})
export class CreatePlanComponent {
  planAddEmptyData = plan_add_empty_data;
  stepsTitle = Stepper;
  displayedColumns: string[] = ['PricingCycle', 'Price'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  testId: string;

  @ViewChild('step1') step1: ElementRef;
  @ViewChild('step2') step2: ElementRef;
  @ViewChild('step3') step3: ElementRef;
  @ViewChild('step4') step4: ElementRef;
  @ViewChild('step5') step5: ElementRef;

  constructor(public dialog: MatDialog) {}

  openPopup() {
    this.dialog.open(FeatureDetailsPopupComponent, {});
  }
  switchStepper(step: any) {
    const stepId = step.id;
    if (stepId === 1) {
      this.step1.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if (stepId === 2) {
      this.step2.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if (stepId === 3) {
      this.step3.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if (stepId === 4) {
      this.step4.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if (stepId === 5) {
      this.step5.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
    // const element = this.step3.nativeElement;
    // window.scrollTo({
    //   top: element.offsetTop,
    //   behavior: 'smooth'
    // })
  }
  arr = [
    {
      step: 'step1',
      id: 'cdk-step-label-0-0',
      attributeValue: 'false',
    },
    {
      step: 'step2',
      id: 'cdk-step-label-0-1',
      attributeValue: 'false',
    },
    {
      step: 'step3',
      id: 'cdk-step-label-0-2',
      attributeValue: 'false',
    },
    {
      step: 'step4',
      id: 'cdk-step-label-0-3',
      attributeValue: 'false',
    },
    {
      step: 'step5',
      id: 'cdk-step-label-0-4',
      attributeValue: 'false',
    },
  ];
  ngAfterViewInit() {
    // Initialize Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
      let findCurrent = entries.find((ele) => ele.isIntersecting == true);
      if (findCurrent) {
        this.testId = String(findCurrent.target.id);
        this.arr.forEach((ele) => {
          if (ele.step == this.testId) {
            document
              .getElementById(ele.id)
              ?.setAttribute('aria-selected', 'true');
          } else {
            document
              .getElementById(ele.id)
              ?.setAttribute('aria-selected', ele.attributeValue);
          }
        });
      }
    });

    // Start observing the element
    const testArr = [
      this.step1,
      this.step2,
      this.step3,
      this.step4,
      this.step5,
    ];
    testArr.forEach((element: any) => {
      observer.observe(element.nativeElement);
      //   console.log(this.testBool, element, element.nativeElement, 'testst')
      //   if (this.testBool) {
      //     const activeStep = document.getElementById('#1')?.classList.add('active')
      //   }
    });
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideStepperComponent } from './side-stepper.component';

describe('SideStepperComponent', () => {
  let component: SideStepperComponent;
  let fixture: ComponentFixture<SideStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanPricingComponent } from './add-plan-pricing.component';

describe('AddPlanPricingComponent', () => {
  let component: AddPlanPricingComponent;
  let fixture: ComponentFixture<AddPlanPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlanPricingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlanPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

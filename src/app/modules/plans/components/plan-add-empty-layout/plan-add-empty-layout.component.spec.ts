import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAddEmptyLayoutComponent } from './plan-add-empty-layout.component';

describe('PlanAddEmptyLayoutComponent', () => {
  let component: PlanAddEmptyLayoutComponent;
  let fixture: ComponentFixture<PlanAddEmptyLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanAddEmptyLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanAddEmptyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

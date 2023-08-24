import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChargePopupComponent } from './new-charge-popup.component';

describe('NewChargePopupComponent', () => {
  let component: NewChargePopupComponent;
  let fixture: ComponentFixture<NewChargePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewChargePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewChargePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

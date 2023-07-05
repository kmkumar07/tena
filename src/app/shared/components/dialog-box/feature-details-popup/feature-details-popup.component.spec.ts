import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureDetailsPopupComponent } from './feature-details-popup.component';

describe('FeatureDetailsPopupComponent', () => {
  let component: FeatureDetailsPopupComponent;
  let fixture: ComponentFixture<FeatureDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureDetailsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

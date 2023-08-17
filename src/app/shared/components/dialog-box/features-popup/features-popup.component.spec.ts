import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesPopupComponent } from './features-popup.component';

describe('FeaturesPopupComponent', () => {
  let component: FeaturesPopupComponent;
  let fixture: ComponentFixture<FeaturesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturesPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

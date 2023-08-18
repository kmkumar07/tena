import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonDetailsPopupComponent } from './addon-details-popup.component';

describe('AddonDetailsPopupComponent', () => {
  let component: AddonDetailsPopupComponent;
  let fixture: ComponentFixture<AddonDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddonDetailsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddonDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

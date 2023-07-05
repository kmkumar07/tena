import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsListingComponent } from './coupons-listing.component';

describe('CouponsListingComponent', () => {
  let component: CouponsListingComponent;
  let fixture: ComponentFixture<CouponsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponsListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

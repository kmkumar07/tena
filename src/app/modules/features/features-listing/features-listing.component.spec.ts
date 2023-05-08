import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesListingComponent } from './features-listing.component';

describe('FeaturesListingComponent', () => {
  let component: FeaturesListingComponent;
  let fixture: ComponentFixture<FeaturesListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturesListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

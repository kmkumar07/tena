import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansListingComponent } from './plans-listing.component';

describe('PlansListingComponent', () => {
  let component: PlansListingComponent;
  let fixture: ComponentFixture<PlansListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlansListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyListingComponent } from './empty-listing.component';

describe('EmptyListingComponent', () => {
  let component: EmptyListingComponent;
  let fixture: ComponentFixture<EmptyListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

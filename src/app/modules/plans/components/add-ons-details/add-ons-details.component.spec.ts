import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnsDetailsComponent } from './add-ons-details.component';

describe('AddOnsDetailsComponent', () => {
  let component: AddOnsDetailsComponent;
  let fixture: ComponentFixture<AddOnsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOnsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOnsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

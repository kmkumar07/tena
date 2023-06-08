import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDateHeaderComponent } from './custom-date-header.component';

describe('CustomDateHeaderComponent', () => {
  let component: CustomDateHeaderComponent;
  let fixture: ComponentFixture<CustomDateHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDateHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomDateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

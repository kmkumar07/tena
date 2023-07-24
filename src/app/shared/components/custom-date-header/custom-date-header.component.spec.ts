import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDateHeaderComponent } from './custom-date-header.component';

describe('CustomDateHeaderComponent', () => {
  let component: CustomDateHeaderComponent<any>;
  let fixture: ComponentFixture<CustomDateHeaderComponent<any>>;

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

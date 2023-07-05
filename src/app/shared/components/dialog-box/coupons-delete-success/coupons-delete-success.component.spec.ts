import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsDeleteSuccessComponent } from './coupons-delete-success.component';

describe('CouponsDeleteSuccessComponent', () => {
  let component: CouponsDeleteSuccessComponent;
  let fixture: ComponentFixture<CouponsDeleteSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponsDeleteSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsDeleteSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

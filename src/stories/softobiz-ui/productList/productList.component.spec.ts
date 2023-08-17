import { ComponentFixture, TestBed } from '@angular/core/testing';

import { productListComponent } from './productList.component';

describe('productListComponent', () => {
  let component: productListComponent;
  let fixture: ComponentFixture<productListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ productListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(productListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

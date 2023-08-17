import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAnimaComponent } from './dialog-anima.component';

describe('DialogAnimaComponent', () => {
  let component: DialogAnimaComponent;
  let fixture: ComponentFixture<DialogAnimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAnimaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAnimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

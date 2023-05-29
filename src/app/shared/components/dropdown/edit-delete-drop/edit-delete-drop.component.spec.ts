import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteDropComponent } from './edit-delete-drop.component';

describe('EditDeleteDropComponent', () => {
  let component: EditDeleteDropComponent;
  let fixture: ComponentFixture<EditDeleteDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeleteDropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDeleteDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCafeComponent } from './add-cafe.component';

describe('AddCafeComponent', () => {
  let component: AddCafeComponent;
  let fixture: ComponentFixture<AddCafeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCafeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

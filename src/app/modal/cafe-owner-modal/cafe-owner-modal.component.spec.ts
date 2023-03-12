import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeOwnerModalComponent } from './cafe-owner-modal.component';

describe('CafeOwnerModalComponent', () => {
  let component: CafeOwnerModalComponent;
  let fixture: ComponentFixture<CafeOwnerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CafeOwnerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeOwnerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

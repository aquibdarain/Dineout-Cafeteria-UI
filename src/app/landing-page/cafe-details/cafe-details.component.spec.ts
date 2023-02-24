import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeDetailsComponent } from './cafe-details.component';

describe('CafeDetailsComponent', () => {
  let component: CafeDetailsComponent;
  let fixture: ComponentFixture<CafeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CafeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

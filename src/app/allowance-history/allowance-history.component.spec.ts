import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowanceHistoryComponent } from './allowance-history.component';

describe('AllowanceHistoryComponent', () => {
  let component: AllowanceHistoryComponent;
  let fixture: ComponentFixture<AllowanceHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllowanceHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowanceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

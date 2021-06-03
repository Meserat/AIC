import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionHistoryComponent } from './deduction-history.component';

describe('DeductionHistoryComponent', () => {
  let component: DeductionHistoryComponent;
  let fixture: ComponentFixture<DeductionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeductionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

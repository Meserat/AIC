import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionDetailsComponent } from './deduction-details.component';

describe('DeductionDetailsComponent', () => {
  let component: DeductionDetailsComponent;
  let fixture: ComponentFixture<DeductionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeductionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

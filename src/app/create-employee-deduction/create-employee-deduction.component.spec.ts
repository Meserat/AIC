import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeeDeductionComponent } from './create-employee-deduction.component';

describe('CreateEmployeeDeductionComponent', () => {
  let component: CreateEmployeeDeductionComponent;
  let fixture: ComponentFixture<CreateEmployeeDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEmployeeDeductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmployeeDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

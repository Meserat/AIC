import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeeDeductionComponent } from './update-employee-deduction.component';

describe('UpdateEmployeeDeductionComponent', () => {
  let component: UpdateEmployeeDeductionComponent;
  let fixture: ComponentFixture<UpdateEmployeeDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmployeeDeductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmployeeDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

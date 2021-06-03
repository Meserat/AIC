import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeeAllowanceComponent } from './create-employee-allowance.component';

describe('CreateEmployeeAllowanceComponent', () => {
  let component: CreateEmployeeAllowanceComponent;
  let fixture: ComponentFixture<CreateEmployeeAllowanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEmployeeAllowanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmployeeAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAllowanceListComponent } from './employee-allowance-list.component';

describe('EmployeeAllowanceListComponent', () => {
  let component: EmployeeAllowanceListComponent;
  let fixture: ComponentFixture<EmployeeAllowanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAllowanceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAllowanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

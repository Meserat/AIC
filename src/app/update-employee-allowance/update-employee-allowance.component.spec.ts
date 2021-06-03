import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeeAllowanceComponent } from './update-employee-allowance.component';

describe('UpdateEmployeeAllowanceComponent', () => {
  let component: UpdateEmployeeAllowanceComponent;
  let fixture: ComponentFixture<UpdateEmployeeAllowanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmployeeAllowanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmployeeAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

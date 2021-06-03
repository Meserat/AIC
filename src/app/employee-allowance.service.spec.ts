import { TestBed } from '@angular/core/testing';

import { EmployeeAllowanceService } from './employee-allowance.service';

describe('EmployeeAllowanceService', () => {
  let service: EmployeeAllowanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeAllowanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

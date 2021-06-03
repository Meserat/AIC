import { TestBed } from '@angular/core/testing';

import { EmployeeHistoryService } from './employee-history.service';

describe('EmployeeHistoryService', () => {
  let service: EmployeeHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

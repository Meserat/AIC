import { TestBed } from '@angular/core/testing';

import { PayrollHistoryService } from './payroll-history.service';

describe('PayrollHistoryService', () => {
  let service: PayrollHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrollHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

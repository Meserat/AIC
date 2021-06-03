import { TestBed } from '@angular/core/testing';

import { DeductionHistoryService } from './deduction-history.service';

describe('DeductionHistoryService', () => {
  let service: DeductionHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeductionHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

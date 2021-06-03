import { TestBed } from '@angular/core/testing';

import { AllowanceHistoryService } from './allowance-history.service';

describe('AllowanceHistoryService', () => {
  let service: AllowanceHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllowanceHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BackpaymentService } from './backpayment.service';

describe('BackpaymentService', () => {
  let service: BackpaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackpaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

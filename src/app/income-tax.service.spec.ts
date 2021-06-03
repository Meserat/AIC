import { TestBed } from '@angular/core/testing';

import { IncomeTaxService } from './income-tax.service';

describe('IncomeTaxService', () => {
  let service: IncomeTaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeTaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

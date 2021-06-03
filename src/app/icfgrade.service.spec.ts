import { TestBed } from '@angular/core/testing';

import { ICFGradeService } from './icfgrade.service';

describe('ICFGradeService', () => {
  let service: ICFGradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ICFGradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CareerSummaryService } from './career-summary.service';

describe('CareerSummaryService', () => {
  let service: CareerSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareerSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

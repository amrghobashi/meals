import { TestBed } from '@angular/core/testing';

import { PricedService } from './priced.service';

describe('PricedService', () => {
  let service: PricedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

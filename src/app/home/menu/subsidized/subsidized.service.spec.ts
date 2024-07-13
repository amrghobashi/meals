import { TestBed } from '@angular/core/testing';

import { SubsidizedService } from './subsidized.service';

describe('SubsidizedService', () => {
  let service: SubsidizedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubsidizedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

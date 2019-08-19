import { TestBed } from '@angular/core/testing';

import { UistatesService } from './uistates.service';

describe('UistatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UistatesService = TestBed.get(UistatesService);
    expect(service).toBeTruthy();
  });
});

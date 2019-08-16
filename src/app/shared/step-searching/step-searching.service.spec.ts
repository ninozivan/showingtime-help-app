import { TestBed } from '@angular/core/testing';

import { StepSearchingService } from './step-searching.service';

describe('StepSearchingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepSearchingService = TestBed.get(StepSearchingService);
    expect(service).toBeTruthy();
  });
});

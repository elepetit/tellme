import { TestBed } from '@angular/core/testing';

import { BellovacomService } from './bellovacom.service';

describe('BellovacomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BellovacomService = TestBed.get(BellovacomService);
    expect(service).toBeTruthy();
  });
});

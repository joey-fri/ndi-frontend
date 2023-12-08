import { TestBed } from '@angular/core/testing';

import { NdiBackendService } from './ndi-backend.service';

describe('NdiBackendService', () => {
  let service: NdiBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NdiBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

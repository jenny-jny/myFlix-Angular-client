import { TestBed } from '@angular/core/testing';

import { FetchAPIDataService } from './fetch-api-data.service';

describe('FetchApiDataService', () => {
  let service: FetchAPIDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchAPIDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

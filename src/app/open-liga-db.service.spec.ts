import { TestBed } from '@angular/core/testing';

import { OpenLigaDbService } from './open-liga-db.service';

describe('OpenLigaDbService', () => {
  let service: OpenLigaDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenLigaDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

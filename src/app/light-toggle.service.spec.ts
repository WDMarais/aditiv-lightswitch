import { TestBed } from '@angular/core/testing';

import { LightToggleService } from './light-toggle.service';

describe('LightToggleService', () => {
  let service: LightToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DeferEventsPluginService } from './defer-events-plugin.service';

describe('DeferEventsPluginService', () => {
  let service: DeferEventsPluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeferEventsPluginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

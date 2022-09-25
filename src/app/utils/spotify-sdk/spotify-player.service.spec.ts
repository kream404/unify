import { TestBed } from '@angular/core/testing';

import { SpotifyPlayerSDK } from './spotify.sdk';

describe('SpotifyPlayerService', () => {
  let service: SpotifyPlayerSDK;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyPlayerSDK);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

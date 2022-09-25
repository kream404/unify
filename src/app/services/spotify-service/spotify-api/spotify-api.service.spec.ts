import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { SpotifyApiService } from './spotify-api.service';

describe('SpotifyApiServiceService', () => {
  let service: SpotifyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthService,
        { provide: AuthService, useValue: {
          authorised: () => of([])                      //have to provide becuse of subscription
        }
      }],
    });
    service = TestBed.inject(SpotifyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

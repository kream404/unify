import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../auth/auth.service';
import { SpotifyPlayerComponent } from './spotify-player.component';

describe('SpotifyPlayerComponent', () => {
  let component: SpotifyPlayerComponent;
  let fixture: ComponentFixture<SpotifyPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),

      ],
      providers: [
        AuthService
      ],
      declarations: [ SpotifyPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifyPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

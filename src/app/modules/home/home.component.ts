import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/model/user_info';
import { AuthService } from '../../services/auth/auth.service';
import { SpotifyApiService } from '../../services/spotify-service/spotify-api/spotify-api.service';
import { SpotifyPlayerComponent } from '../../services/spotify-service/spotify-player/spotify-player.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public authorised: boolean;
  public user!: UserInfo;
  constructor(public spotify_player: SpotifyPlayerComponent, public spotify: SpotifyApiService, public auth: AuthService) { 
    this.authorised = false;

  }

  ngOnInit() {
      this.spotify.userInfo().then((data) => {
        this.user = data!;
      });
    }
  }



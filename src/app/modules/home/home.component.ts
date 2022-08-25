import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/model/user_info';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SpotifyApiService } from 'src/app/services/spotify_service/spotify-api/spotify-api.service';
import { SpotifyPlayerSDK } from 'src/app/services/spotify_service/spotify-player/spotify-player.sdk';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public authorised: boolean;
  public user!: UserInfo;
  constructor(public spotify_player: SpotifyPlayerSDK, public spotify: SpotifyApiService, public auth: AuthService) { 
    this.authorised = false;

  }

  ngOnInit() {
    this.spotify_player.addPlayerSDK();
      this.spotify.userInfo().then((data) => {
        this.user = data!;
      });
    }
  }



import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { BearerToken } from 'src/app/model/bearer_token';
import { UserInfo } from 'src/app/model/user_info';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SpotifyService } from 'src/app/services/spotify_service/spotify-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public authorised: boolean;
  public user!: UserInfo;
  constructor(public spotify: SpotifyService, public auth: AuthService) { 
    this.authorised = false;

  }

  ngOnInit(): void {
      this.spotify.userInfo().then((userInfo : any) => {
        this.user = userInfo;
        console.log('USER ' + JSON.stringify(this.user.followers));
      });
      
    }
  }



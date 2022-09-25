import { Component, Injector, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpotifyApiService } from 'src/app/services/spotify-service/spotify-api/spotify-api.service';
import { SpotifyPlayerSDK } from '../../utils/spotify-sdk/spotify.sdk';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit {
  sdk: SpotifyPlayerSDK;
  title: string;
  artist: Array<string> = new Array<string>();
  image_url: string


  constructor(public injector: Injector, public spotify_api: SpotifyApiService) {
    this.sdk = this.injector.get(SpotifyPlayerSDK);
  }

  ngOnInit(): void {
    this.sdk.isPlaying().subscribe((playing) => {
      if(playing){
      }
    });

    this.sdk.track().subscribe((track: any) => {
      this.spotify_api.getTrack(track.current_track.id).then((track: any) => {
        console.log(track);
        this.title = track.name;
        this.artist = track.artists[0].name;
        this.image_url = track.album.images[1].url;
      });
    })
  }

}

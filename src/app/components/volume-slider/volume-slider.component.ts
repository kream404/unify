import { Component, Injector, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify_service/spotify-api/spotify-api.service';
import { SpotifyPlayerSDK } from 'src/app/utils/sdk/spotify.sdk';

@Component({
  selector: 'app-volume-slider',
  templateUrl: './volume-slider.component.html',
  styleUrls: ['./volume-slider.component.css']
})
export class VolumeSliderComponent implements OnInit {

  _volume: number;
  sdk: SpotifyPlayerSDK
  constructor(public injector: Injector) {
    this.sdk = this.injector.get(SpotifyPlayerSDK);
  }

  ngOnInit(): void {
    this.sdk.isReady().subscribe(async (ready) => {
      if(ready){
          await this.sdk.getVolume().then((volume =>{
          this._volume = volume * 100;
        }));
      }
   })
  }
}

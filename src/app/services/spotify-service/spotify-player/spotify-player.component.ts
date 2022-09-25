import { ThisReceiver } from '@angular/compiler';
import { Component, Injector, OnInit } from '@angular/core';
import { SpotifyPlayerSDK } from '../../../utils/spotify-sdk/spotify.sdk';
import { SpotifyApiService } from '../spotify-api/spotify-api.service';

@Component({
  selector: 'spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.css']
})

// this will eventually be THE player - should maybe extend sdk?
export class SpotifyPlayerComponent implements OnInit {
  
  playing: boolean;
  sdk: SpotifyPlayerSDK;
  
  constructor(public injector: Injector, public spotify_api: SpotifyApiService) { 
    this.sdk = this.injector.get(SpotifyPlayerSDK);
  }

  async ngOnInit(): Promise<void> { 
    
    this.sdk.addPlayerSDK().then(() => {
      this.playing = false;
    });

    this.sdk.isReady().subscribe((ready) => {
      if(ready){
        this.spotify_api.transferPlayback().finally(() => {
            this.sdk.resume();         
            this.playing = true;
          });
      }
    });
  }

  public play(){
    this.sdk.resume();
    this.playing = true;
  }

  public pause(){
    this.sdk.pause();
    this.playing = false;
  }

  public next(){
    this.sdk.next();
  }

  public previous(){
    this.sdk.previous();
  }

  public getVolume(){
    this.sdk.getVolume();
  }
}

import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SpotifyPlayerSDK } from '../../../utils/sdk/spotify.sdk';
import { SpotifyApiService } from '../spotify-api/spotify-api.service';

@Component({
  selector: 'spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.css']
})

// this will eventually be THE player - should maybe extend sdk?
export class SpotifyPlayerComponent implements OnInit {
  
  playing: boolean;

  constructor(public sdk: SpotifyPlayerSDK, public spotify_api: SpotifyApiService) { 
    this.sdk.ready.subscribe((ready) => {
      console.log('READY ' + ready);
      if(ready){
        this.spotify_api.transferPlayback();
      }
    })
  }

  async ngOnInit(): Promise<void> { 
    this.playing = false;
    await this.sdk.addPlayerSDK();
  
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

  public playerState(){
    this.sdk.playerState();
  }

  public getVolume(){
    this.sdk.getVolume();
  }
}

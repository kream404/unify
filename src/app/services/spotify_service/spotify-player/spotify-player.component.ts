import { Component, OnInit } from '@angular/core';
import { SpotifyPlayerSDK } from 'src/app/utils/sdk/spotify.sdk';

@Component({
  selector: 'spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.css']
})

// this will eventually be THE player
export class SpotifyPlayerComponent implements OnInit {
  
  playing: boolean;

  constructor(public sdk: SpotifyPlayerSDK) { 
  }

  ngOnInit(): void { 
    this.playing = false;
  }

  public play(){
    this.sdk.play();
    this.playing = true;
    console.log(this.playing);
  }

  public pause(){
    this.sdk.play();
    this.playing = false;
    console.log(this.playing);
  }

  public next(){
    this.sdk.next();
  }

  public previous(){
    this.sdk.previous();
  }
}

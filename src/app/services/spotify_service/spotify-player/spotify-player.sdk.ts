///  <reference types="@types/spotify-web-playback-sdk"/>
import { Injectable, NgZone, OnInit } from '@angular/core';
import { SpotifyApiService } from '../spotify-api/spotify-api.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlayerSDK {

  private player: Spotify.Player;
  private state: Spotify.PlaybackState;
  
  constructor(private spotifyService: SpotifyApiService, private zone: NgZone) {}
  
  addPlayerSDK() {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.type = 'text/javascript';
    script.addEventListener('load', (e) => {
      console.log(e);
    });

    document.head.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('The Web Playback SDK is ready. We have access to Spotify.Player');
      // console.log(window.Spotify.Player);
      this.player = new Spotify.Player({
        name: 'unify',
        volume: 0.5,
        getOAuthToken: (callback) => {
          const token = JSON.parse(localStorage.getItem('auth.service.access_token')!);
          callback(token.access_token);
        }
      });

      this.player.connect().then((res) => {
        console.log(res);
      });

      // Ready
      this.player.on('ready', (data) => {
        console.log('Ready with Device ID', data.device_id);
      });

      this.player.addListener('player_state_changed', (state) => {
        console.log(state);
        if (
          this.state &&
          state.track_window.previous_tracks.find((x) => x.id === state.track_window.current_track.id) &&
          !this.state.paused &&
          state.paused
        ) {
          console.log('Track ended');
        }
        this.state = state;
      });
    };
  }
}
///  <reference types="@types/spotify-web-playback-sdk"/>
import { Injectable, NgZone, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, distinctUntilChanged  } from 'rxjs';

const LS_DEVICE_ID = 'spotify.sdk.device_id';
@Injectable({
  providedIn: 'root',
})
export class SpotifyPlayerSDK {

  private player: Spotify.Player;
  private state: BehaviorSubject<Spotify.PlaybackState | null> = new BehaviorSubject<Spotify.PlaybackState | null>(null);
  public ready: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor() {}
  
  public addPlayerSDK(): Promise<void> {
    return new Promise(() => {

      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.type = 'text/javascript';
      script.addEventListener('load', (e) => {
        console.log(e);
    });

    document.head.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = (() => {
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

        // Ready
        this.player.on('ready', (data) => {
          console.log('Ready with Device ID', data.device_id);
          window.localStorage.setItem(LS_DEVICE_ID, data.device_id);
          this.ready.next(true);
        });

        this.player.addListener('player_state_changed', (state) => {
          console.log(state);
          this.state.next(state);
        });

        this.player.addListener('initialization_error', ({ message }) => { 
          console.error(message);
        });
    
        this.player.addListener('authentication_error', ({ message }) => {
            console.error(message);
        });
      
        this.player.addListener('account_error', ({ message }) => {
            console.error(message);
        });

        this.player.connect().then((_data) => {
          console.log('player connected')
        });
      });
    });
  }
  
  // has to be 'connected' via spotify app - need to make this automatic
  public playerState(){
      this.player.getCurrentState().then((state) => {
        console.log(state);
      });
  }

  public resume(){
    this.player.resume();
  }

  public pause(){
    this.player.pause();
  }

  public next(){
    this.player.nextTrack();
  }

  public previous(){
    this.player.previousTrack();
  }

  public getVolume(): Promise<number>{
    return this.player.getVolume().then((result) => {
      console.log(result);
      return Promise.resolve(result);
    });
  }

  public setVolume(gain: number){
    this.player.setVolume(gain).then(() => {
      console.log(`The volume of the player is ` + this.getVolume());
    });
  }

  public isReady(): Observable<Boolean> {
    console.log(this.ready.asObservable().pipe(distinctUntilChanged()));
    return this.ready.asObservable().pipe(distinctUntilChanged());
  }
}
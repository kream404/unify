///  <reference types="@types/spotify-web-playback-sdk"/>
import { Injectable, NgZone, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, distinctUntilChanged, from, interval, timer  } from 'rxjs';

const LS_DEVICE_ID = 'spotify.sdk.device_id';
@Injectable({
  providedIn: 'root',
})
export class SpotifyPlayerSDK {

  private player: Spotify.Player;
  private _state: BehaviorSubject<any>  = new BehaviorSubject<any>(null);
  public ready: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  public playing: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  public timer: any;

  constructor() {
    this.playing.subscribe((play) => {
      if(play){
        console.log('emitting state');
        this.timer = interval(1).subscribe(x => {
          this.monitorPlayerState();
      })
      }else{
        this.timer.unsubscribe()
      }
    })
  }
  
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
          this._state.next(state);
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
  
  public monitorPlayerState(){
    this.player.getCurrentState().then((state) => {
      this._state.next(state!);
    });
  }
  public resume(){
    this.playing.next(true);
    this.player.resume();
  }

  public pause(){
    this.playing.next(false);
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
      return Promise.resolve(result);
    });
  }

  public setVolume(gain: number){
    this.player.setVolume(gain).then(() => {
      console.log(`The volume of the player is ` + this.getVolume());
    });
  }

  public seek(pos: number){
    this.player.seek(pos).then(() => {
      console.log(`The position of the player is ` + this.getVolume());
    });
  }

  public isReady(): Observable<Boolean> {
    return this.ready.asObservable().pipe(distinctUntilChanged());
  }

  public isPlaying(): Observable<Boolean> {
    return this.playing.asObservable().pipe(distinctUntilChanged());
  }

  public state(): Observable<Spotify.PlaybackState> {
    return this._state.asObservable().pipe(distinctUntilChanged());
  }
}
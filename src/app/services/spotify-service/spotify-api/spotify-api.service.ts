import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { delay, retry } from 'rxjs';
import { UserInfo } from 'src/app/model/user_info';
import { HelperUtils } from 'src/app/utils/helper-utils';
import { AuthService } from '../../auth/auth.service';

const URL = 'https://api.spotify.com/v1'

@Injectable({
  providedIn: 'root'
})

export class SpotifyApiService {


  access_token: string | null | undefined;

  constructor(public auth: AuthService, private http: HttpClient) {}

  public async userInfo(): Promise<UserInfo | null> {

    return new Promise((resolve, reject) => {
    let headers = this.createRequestHeader();
    
    this.http.get(URL + "/me", {headers: headers,}).subscribe((userInfo: any) => {
      return resolve(userInfo);
    });
      return null;
    });
  }

  // transfer playback to new player instance - flaky - defs need revisit
  public async transferPlayback(): Promise<void> {
    let device_id = window.localStorage.getItem('spotify.sdk.device_id');
    console.log('id from api ' + device_id)
    
    const request = {
      device_ids: [
          device_id
      ]
    }

    return new Promise((resolve, reject) => {
    let headers = this.createRequestHeader();
    this.http.put(URL + "/me/player", request, {headers: headers,}).pipe().subscribe((data: any) => {
      if(data.code == 404 || data.code == 400){
        HelperUtils.delay(5 * 1000).then(() =>{
        console.log('now')

        });
      }if(data.code == 200){
        return resolve(data)
      }
      });
    })
  }

  getDevices(): Promise<void> {
    let headers = this.createRequestHeader();

    return new Promise((resolve, reject) => {
    this.http.get(URL + "/me/player/devices", {headers: headers,}).pipe(retry(5), delay(10000)).subscribe((data: any) => {
      if(data.code == 404 || data.code == 400){
        HelperUtils.delay(3000).finally(() => {
          this.transferPlayback();
        })
      }if(data.code == 200){
        return resolve(data)
      }
      });
    })
  }

  getTrack(id: string): Promise<Spotify.PlaybackContextTrack> {
    let headers = this.createRequestHeader();
    
    return new Promise((resolve, reject) => {
    this.http.get(URL + `/tracks/${id}`, {headers: headers,} ).pipe().subscribe((data: any) => {
      return resolve(data)
      });
    })
  }

  createRequestHeader(): HttpHeaders {
    this.access_token = this.auth.bearerToken();
    let headers = new HttpHeaders()
      .set("Authorization", "Bearer " + this.access_token)
      .set("Content-Type", "application/json");
    return headers;
  }
}

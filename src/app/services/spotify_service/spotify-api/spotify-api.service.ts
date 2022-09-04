import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { delay, retry } from 'rxjs';
import { UserInfo } from 'src/app/model/user_info';
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

  // transfer playback to new player instance
  public async transferPlayback(): Promise<void> {
    let device_id = window.localStorage.getItem('spotify.sdk.device_id');
    
    const request = {
      device_ids: [
          device_id
      ]
    }

    console.log(JSON.stringify(request));

    return new Promise((resolve, reject) => {
    let headers = this.createRequestHeader();
    
    this.http.put(URL + "/me/player", request, {headers: headers,}).subscribe((data: any) => {
      return resolve(data);
    });
      return null;
    });
  }

  createRequestHeader(): HttpHeaders {
    this.access_token = this.auth.bearerToken();
    console.log('token ' + this.access_token  )
    let headers = new HttpHeaders()
      .set("Authorization", "Bearer " + this.access_token)
      .set("Content-Type", "application/json");
    return headers;
  }
}

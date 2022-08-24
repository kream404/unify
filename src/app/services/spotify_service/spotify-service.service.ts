import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BearerToken } from 'src/app/model/bearer_token';
import { UserInfo } from 'src/app/model/user_info';
import { AuthService } from '../auth/auth.service';

const URL = 'https://api.spotify.com/v1'

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

  access_token: string | null | undefined;

  constructor(public auth: AuthService, private http: HttpClient) {

  }

  public userInfo(): Promise<UserInfo> {

    return new Promise((resolve, reject) => {
    let headers = this.createRequestHeader();
    
    this.http.get(URL + "/me", {headers: headers,}).subscribe((userInfo: any) => {
      console.log(JSON.stringify(userInfo));
      resolve(userInfo);
    });
  });
  }

  createRequestHeader(): HttpHeaders {
    this.access_token = this.auth.bearerToken();
    console.log('TOKEN: ' + this.access_token)
    let headers = new HttpHeaders()
      .set("Authorization", "Bearer " + this.access_token)
      .set("Content-Type", "application/json");
    return headers;
  }
}

    window.Buffer = window.Buffer || require('buffer').Buffer;  //used for token encoding

import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AUTH_CONFIG } from './auth_config';
import { TokenEndpointResponse } from '@auth0/auth0-spa-js';


const LS_TOKEN_RESPONSE = 'auth.service.token_response';

@Injectable()
export class AuthService {

  private _tokenResponses: BehaviorSubject<TokenEndpointResponse | null> = new BehaviorSubject<TokenEndpointResponse | null>(null);

  constructor(private http: HttpClient){
      this._tokenResponses.subscribe((token: TokenEndpointResponse | null) => {
        if (token) {
            window.localStorage.setItem(LS_TOKEN_RESPONSE, JSON.stringify(token.access_token));
        } else {
            window.localStorage.removeItem(LS_TOKEN_RESPONSE);
        }
    });
  }


  login() {
      const body= 'grant_type=client_credentials'

      this.http.post(AUTH_CONFIG.auth_url, body, {
          headers: new HttpHeaders({
              'Authorization': 'Basic ' + Buffer.from(AUTH_CONFIG.client_id + ':' + AUTH_CONFIG.client_secret).toString('base64'),
              'Content-Type': 'application/x-www-form-urlencoded;'
          }),
      }
      // any for unknown entity
      ).subscribe((data: any) => {
        console.log(data.access_token)
        return this._tokenResponses?.next(data.access_token)
      });
  }
}

window.Buffer = window.Buffer || require('buffer').Buffer;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthorizationNotifier,
  BaseTokenRequestHandler,
  RedirectRequestHandler,
  Requestor,
  StringMap,
  TokenResponse,
} from '@openid/appauth';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BearerToken } from '../../model/bearer_token';

const LS_TOKEN_RESPONSE = 'auth.service.access_token';
const LS_AUTH_STATUS = 'auth.service.auth_status';

const AUTH_URL = 'https://accounts.spotify.com';
const AUTH_SCOPE = '&scope=user-read-private%20user-read-email%20streaming&state=&show_dialog=true';
@Injectable()
export class AuthService {
  
  private _tokenResponses: BehaviorSubject<BearerToken | null> = new BehaviorSubject<BearerToken | null>(null);
  private _authorised: BehaviorSubject<Boolean | null> = new BehaviorSubject<Boolean | null >(false);

  constructor(private http: HttpClient, public router: Router) {
    this._tokenResponses.subscribe((token: BearerToken | null) => {
      if(token) {
        window.localStorage.setItem(LS_TOKEN_RESPONSE, JSON.stringify(token));
        window.localStorage.setItem(LS_AUTH_STATUS, JSON.stringify('true'))
        this._authorised.next(true);
      }
    });
  }

  login() {
    const request = {
      client_id: environment.client_id,
      redirect_uri: environment.redirect_uri,
      response_type: 'code',
    };

    this.performAuthorizationRequest(request);
  }
  performAuthorizationRequest(request: any) {
    // using const for auth scope as URL serach params seems to encode it wrong - may revisit later
    return window.open(AUTH_URL + '/authorize?' + new URLSearchParams(request).toString() + AUTH_SCOPE);
  }

  completeAuthorizationRequest(code: string): Promise<BearerToken> | null {
    return new Promise((resolve, reject) => {
      console.log('Authorization request complete ');
      if(code) {
        // use the code to make the token request.
        const extras: StringMap = {};
        if (environment.client_secret) {
          extras['client_secret'] = environment.client_secret;
        }
        const tokenRequest = {
          client_id: environment.client_id,
          redirect_uri: environment.redirect_uri,
          grant_type: 'authorization_code',
          code: code,
        };

        let headers = this.createAuthorizationHeader();

        this.http.post(AUTH_URL + '/api/token', new URLSearchParams(tokenRequest), {headers: headers,}).subscribe((tokenResponse: any) => {
            console.log('TOKEN RESP: ' + JSON.stringify(tokenResponse));
            this._tokenResponses.next(tokenResponse);
            this._authorised.next(true);
            resolve(tokenResponse);
          });
      } else {
        reject(console.error());
      }
    });
  }

  createAuthorizationHeader(): HttpHeaders {
    let headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + Buffer.from(environment.client_id + ':' + environment.client_secret).toString('base64'))
      .set('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  public authorised(): Observable<Boolean | null> {
    let authorised = JSON.parse(window.localStorage.getItem('auth.service.auth_status')!);
  
    if(authorised){
      this._authorised.next(authorised);
    }
    return this._authorised;
  }

  public bearerToken(): string {
    let token = JSON.parse(window.localStorage.getItem('auth.service.access_token')!);
    console.log('token ' + token);
    return token.access_token;
  }

  // TODO: use refresh token to keep user logged in
  // TODO: the navigation should be handled by an auth guard, will implement later, this is fine for now
  public logout() {
    this._authorised.next(false);
    this._tokenResponses.next(null);
    window.localStorage.removeItem(LS_TOKEN_RESPONSE);
    window.localStorage.removeItem(LS_AUTH_STATUS);
    
    this.router.navigate(['']);
  }
}

window.Buffer = window.Buffer || require("buffer").Buffer;
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Token } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  AuthorizationNotifier,
  BaseTokenRequestHandler,
  RedirectRequestHandler,
  Requestor,
  StringMap,
  TokenResponse,
} from "@openid/appauth";
import { BehaviorSubject, distinctUntilChanged, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { BearerToken } from "../../model/bearer_token";

const LS_TOKEN_RESPONSE = "auth.service.access_token";
const AUTH_URL = "https://accounts.spotify.com";

@Injectable()
export class AuthService {
  
  private _tokenResponses: BehaviorSubject<BearerToken | null> = new BehaviorSubject<BearerToken | null>(null);
  private _authorised: BehaviorSubject<Boolean | null> = new BehaviorSubject<Boolean | null >(false);

  constructor(private http: HttpClient, private requestor: Requestor, public router: Router) {
    this._tokenResponses.subscribe((token: BearerToken | null) => {
      if(token) {
        window.localStorage.setItem(LS_TOKEN_RESPONSE, JSON.stringify(token.access_token));
      }
    });
  }

  login() {
    const request = {
      client_id: environment.client_id,
      redirect_uri: environment.redirect_uri,
      scope: environment.scope,
      response_type: "code",
    };

    this.performAuthorizationRequest(request);
  }

  performAuthorizationRequest(request: any) {
    return window.open(AUTH_URL + "/authorize?" + new URLSearchParams(request).toString());
  }

  completeAuthorizationRequest(code: string): Promise<BearerToken> | null {
    return new Promise((resolve, reject) => {
      console.log("Authorization request complete ");
      if(code) {
        // use the code to make the token request.
        const extras: StringMap = {};
        if (environment.client_secret) {
          extras["client_secret"] = environment.client_secret;
        }
        const tokenRequest = {
          client_id: environment.client_id,
          redirect_uri: environment.redirect_uri,
          grant_type: "client_credentials",
          code: code,
        };

        let headers = this.createAuthorizationHeader();

        this.http.post(AUTH_URL + "/api/token", new URLSearchParams(tokenRequest), {headers: headers,}).subscribe((tokenResponse: any) => {
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
      .set("Authorization", "Basic " + Buffer.from(environment.client_id + ":" + environment.client_secret).toString("base64"))
      .set("Content-Type", "application/x-www-form-urlencoded");
    return headers;
  }

  public authorised(): Observable<Boolean | null> {
    return this._authorised.asObservable().pipe(distinctUntilChanged());
  }

  // TODO: the navigation should be handled by an auth guard, will implement later, this is fine for now
  public logout() {
    this._authorised.next(false);
    this._tokenResponses.next(null);
    this.router.navigate([''])
  }
}

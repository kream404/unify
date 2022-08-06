import { Injectable } from '@angular/core';
var spotify = require('spotify-web-api-node');

// credentials are optional
var spotify = new spotify({
  clientId: 'e0f17f94f4074a1cbb0d6057979cec77',
  clientSecret: '94b3f404db294b5c9a996acb55aea1c1',
  redirectUri: 'http://www.localhost:4200/callback'
})

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {



  constructor() { }
}

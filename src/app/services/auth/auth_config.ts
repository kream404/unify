interface AuthConfig {
  client_id: string;
  domain: string;
  callback_url: string;
  auth_url: string;
  client_secret: string;
  scopes: string [];
}

export const AUTH_CONFIG: AuthConfig = {
  client_id: 'e0f17f94f4074a1cbb0d6057979cec77',
  domain: 'http://localhost:4200',
  callback_url: 'http://localhost:4200/callback',
  auth_url: 'https://accounts.spotify.com/api/token',
  client_secret: '94b3f404db294b5c9a996acb55aea1c1',
  scopes: ['user-read-private', 'user-read-email']
}

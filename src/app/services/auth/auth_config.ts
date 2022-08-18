
export interface AuthorizationConfig {
  client_id:      string;
  client_secret?: string;
  redirect_uri:   string;
  scope?:         string;
  state?:         string;
  extras?:        any;
}

export interface GeneralEnvironmentInfo {
  production?: boolean;
}



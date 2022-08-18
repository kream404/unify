import { AuthorizationConfig, GeneralEnvironmentInfo } from "src/app/services/auth/auth_config";

export const  environment: AuthorizationConfig & GeneralEnvironmentInfo = {
  client_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  client_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  redirect_uri: 'https://localhost:4200/callback',
  scope: 'user-read-private user-read-email'
}

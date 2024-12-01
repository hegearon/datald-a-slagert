import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { type AuthContextProps } from "react-oidc-context";

export function useSpotify(auth: AuthContextProps) {
  return SpotifyApi.withAccessToken(auth.settings.client_id, {
    access_token: auth.user?.access_token,
    token_type: auth.user?.token_type,
    refresh_token: auth.user?.refresh_token,
    expires_in: auth.user?.expires_in,
  });
}

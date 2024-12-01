import { Scopes } from "@spotify/web-api-ts-sdk";
import type { AuthProviderProps } from "react-oidc-context";

export const spotify_oidc_config: AuthProviderProps = {
  authority: "https://accounts.spotify.com/authorize",
  // oidc is not configured on the authority endpoint
  metadata: {
    issuer: "https://accounts.spotify.com",
    authorization_endpoint: "https://accounts.spotify.com/oauth2/v2/auth",
    token_endpoint: "https://accounts.spotify.com/api/token",
    userinfo_endpoint: "https://accounts.spotify.com/oidc/userinfo/v1",
    revocation_endpoint: "https://accounts.spotify.com/oauth2/revoke/v1",
  },
  client_id: import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID,
  redirect_uri: import.meta.env.PUBLIC_SPOTIFY_REDIRECT_URL,
  scope: [
    ...Scopes.playlistRead,
    ...Scopes.userPlayback,
    ...Scopes.userDetails,
  ].join(" "),
  onSigninCallback() {
    const location = window.location;
    window.history.replaceState(
      {},
      document.title,
      location.origin + location.pathname + location.hash,
    );
  },
};

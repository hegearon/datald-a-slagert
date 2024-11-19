import { useEffect, useState } from "react";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useAuth } from "react-oidc-context";

export function useSpotify() {
  const auth = useAuth();
  const [sdk, setSdk] = useState<SpotifyApi>(null);

  useEffect(() => {
    const internalSdk = SpotifyApi.withAccessToken(auth.settings.client_id, {
      access_token: auth.user.access_token,
      token_type: auth.user.token_type,
      expires_in: auth.user.expires_in,
      refresh_token: auth.user.refresh_token,
    });

    setSdk(internalSdk);
  }, [auth]);

  return sdk;
}

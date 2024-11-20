import { useEffect, useState } from "react";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useAuth } from "react-oidc-context";

export function useSpotify() {
  const auth = useAuth();
  const [sdk, setSdk] = useState<SpotifyApi>(null);

  useEffect(() => {
    (async () => {
      const user = await auth.signinSilent();
      const internalSdk = SpotifyApi.withAccessToken(auth.settings.client_id, {
        access_token: user.access_token,
        token_type: user.token_type,
        expires_in: user.expires_in,
        refresh_token: user.refresh_token,
      });

    setSdk(internalSdk);
    })();
  }, [auth]);

  return sdk;
}

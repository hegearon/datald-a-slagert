import { useEffect, useState } from "react";
import { type UserProfile } from "@spotify/web-api-ts-sdk";
import { AuthProvider } from "react-oidc-context";

import { spotify_oidc_config } from "./oidc_config";
import { useSpotify } from "../../hooks/useSpotify";

function GetProfileInternal() {
  const sdk = useSpotify();
  const [profile, setProfile] = useState<UserProfile>(null);

  useEffect(() => {
    (async () => {
      setProfile(await sdk.currentUser.profile());
    })();
  }, [sdk]);

  if (profile === null) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>
        Hello <em>{profile.display_name}</em> !
      </h1>
      <ul>
        <li>
          <strong>E-mail:</strong> {profile.email}
        </li>
        <li>
          <strong>Country:</strong> {profile.country}
        </li>
      </ul>
    </>
  );
}

export function GetProfile() {
  return (
    <>
      <AuthProvider {...spotify_oidc_config}>
        <GetProfileInternal />
      </AuthProvider>
    </>
  );
}

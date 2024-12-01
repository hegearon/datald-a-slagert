import { useEffect, useState } from "react";
import { SpotifyApi, type UserProfile } from "@spotify/web-api-ts-sdk";
import { type AuthContextProps } from "react-oidc-context";

export function GetProfile({
  auth,
  spotify,
}: {
  auth: AuthContextProps;
  spotify: SpotifyApi;
}) {
  const [profile, setProfile] = useState<UserProfile>(null);

  useEffect(() => {
    (async () => {
      try {
        setProfile(await spotify.currentUser.profile());
      } catch (e) {
        console.error(e);
      }
    })();
  }, [auth]);

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

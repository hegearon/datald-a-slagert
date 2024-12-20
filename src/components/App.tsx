import { AuthProvider, useAuth } from "react-oidc-context";

import { spotify_oidc_config } from "./spotify/oidc_config";
import { GetProfile } from "./spotify/GetProfile";
import { DisplayPlaylist } from "./spotify/DisplayPlaylist";
import { useSpotify } from "../hooks/useSpotify";

function AppInternal() {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    const spotify = useSpotify(auth);
    return (
      <div>
        <div>
          Hello {auth.user?.profile.sub}{" "}
          <button onClick={() => void auth.removeUser()}>Log out</button>
        </div>
        <GetProfile auth={auth} spotify={spotify} />
        <DisplayPlaylist auth={auth} spotify={spotify} />
      </div>
    );
  }

  return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
}

export function App() {
  return (
    <>
      <AuthProvider {...spotify_oidc_config}>
        <AppInternal />
      </AuthProvider>
    </>
  );
}

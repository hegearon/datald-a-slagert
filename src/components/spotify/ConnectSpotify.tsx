import { useAuth } from "react-oidc-context";
import { AuthProvider } from "react-oidc-context";

import { spotify_oidc_config } from "./oidc_config";

export function ConnectSpotifyInternal() {
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
    return (
      <div>
        Hello {auth.user?.profile.sub}{" "}
        <button onClick={() => void auth.removeUser()}>Log out</button>
      </div>
    );
  }

  return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
}

export function ConnectSpotify() {
  return (
    <>
      <AuthProvider {...spotify_oidc_config}>
        <ConnectSpotifyInternal />
      </AuthProvider>
    </>
  );
}

import { type AuthContextProps } from "react-oidc-context";
import { useEffect, useState } from "react";
import type {
  Page,
  PlaylistedTrack,
  SpotifyApi,
  Track,
} from "@spotify/web-api-ts-sdk";

type data = Page<PlaylistedTrack<Track>>;

export function DisplayPlaylist({
  auth,
  spotify,
}: {
  auth: AuthContextProps;
  spotify: SpotifyApi;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [playlistId, setPlaylistId] = useState<string>(
    "2LVvgP7VJN5xAkmPdl5J4q",
  );
  const [playlistData, setPlaylistData] = useState<data>(null);

  useEffect(() => {
    (async () => {
      try {
        setPlaylistData(await spotify.playlists.getPlaylistItems(playlistId));
      } catch (e) {
        console.error(e);
      }
    })();
  }, [auth, playlistId]);

  if (playlistData === null) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {playlistData.items.map((element) => (
            <tr key={element.track.id}>
              <td>{element.track.artists.map((artist) => artist.name)}</td>
              <td>{element.track.name}</td>
              <td>{element.track.album.release_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

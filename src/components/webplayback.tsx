import { useEffect, useState } from "react";

interface Props {
  token: string;
}

export default function WebPlayback({ token }: Props) {
  const initialTrack: Spotify.Track = {
    name: "",
    album: {
      images: [{ url: "" }],
      name: "",
      uri: "",
    },
    artists: [
      {
        name: "",
        uri: "",
        url: "",
      },
    ],
    duration_ms: 0,
    id: null,
    is_playable: false,
    uid: "",
    uri: "",
    media_type: "audio",
    type: "track",
    track_type: "audio",
    linked_from: {
      uri: null,
      id: null,
    },
  };

  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [is_paused, setPaused] = useState<boolean>(false);
  const [is_active, setActive] = useState<boolean>(false);
  const [current_track, setTrack] = useState<Spotify.Track>(initialTrack);
  console.log(current_track)
  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log("entrou")
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {cb(token)},
        volume: 0.5,
        enableMediaSession: false
      });

      setPlayer(player);

        // Ready
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
      });

      player.addListener('initialization_error', ({ message }) => {
          console.error(message);
      });

      player.addListener('authentication_error', ({ message }) => {
          console.error(message);
      });

      player.addListener('account_error', ({ message }) => {
          console.error(message);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          if (!state) {
            setActive(false);
          } else {
            setActive(true);
          }
        });
      });

      player.connect();
    };
  }, [token]);

  return (
    <>
    <h1>web playback</h1>
      <div>
        <div className="main-wrapper">
          <img
            src={current_track.album.images[0].url}
            className="now-playing__cover"
            alt=""
          />

          <div className="now-playing__side">
            <div className="now-playing__name">{current_track.name}</div>

            <div className="now-playing__artist">
              {current_track.artists[0].name}
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
}

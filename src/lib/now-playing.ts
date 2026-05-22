export type Track = {
  title: string;
  artist?: string;
  isLive: boolean;
};

const CURATED_TRACKS: Track[] = [
  { title: "chillhop essentials", isLive: false },
  { title: "lofi beats radio", isLive: false },
  { title: "Buena Vista Social Club — Chan Chan", isLive: false },
  { title: "J Dilla — Donuts", isLive: false },
  { title: "Nujabes — Modal Soul", isLive: false },
  { title: "Bonobo — Migration", isLive: false },
];

/**
 * Returns the current "now playing" track.
 *
 * Current: rotates through CURATED_TRACKS based on the provided index.
 *
 * TODO(spotify): replace with real Spotify Web API integration.
 *   - this becomes async and reads from /api/now-playing
 *   - the route handler calls Spotify with a stored refresh token
 *   - response is cached 30s
 *   Components using this stay unchanged — Track interface is stable.
 */
export function getNowPlaying(index: number): Track {
  return CURATED_TRACKS[index % CURATED_TRACKS.length];
}

export const TRACK_ROTATION_MS = 8000;
export const TRACK_COUNT = CURATED_TRACKS.length;

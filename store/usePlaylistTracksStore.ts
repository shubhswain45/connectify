import { Track } from '@/gql/graphql'; // Adjust the import path as necessary
import { create } from 'zustand';

interface PlaylistTracksStore {
  playlistDetails: {
    tracks: Track[] | null; // Array of tracks or null if not set
    currentTrackIndex: number; // Index of the currently playing track
    isEndOfPlaylist: boolean; // Flag to check if the playlist is at its end
    hasNext: boolean; // Indicates if there is a next track
    hasPrev: boolean; // Indicates if there is a previous track
    isUpadted: string
  };
  setPlaylistDetails: (updates: Partial<PlaylistTracksStore['playlistDetails']>) => void; // Updates playlist details
  toggleTrackLikeStatus: (trackId: string, isLiked: boolean) => void; // Toggles the like status of a track
  isTrackLiked: (trackId: string) => boolean; // Checks if a track is liked
  getCurrentTrackIndex: (trackId: string) => number; // Retrieves the index of a track
  updateTrackAvailability: (index: number) => void; // Updates the `hasNext` and `hasPrev` properties
}

export const usePlaylistTracksStore = create<PlaylistTracksStore>((set, get) => ({
  playlistDetails: {
    tracks: null,
    currentTrackIndex: -1,
    isEndOfPlaylist: false,
    hasNext: false,
    hasPrev: false,
    isUpadted: "no"
  },

  setPlaylistDetails: (updates: Partial<PlaylistTracksStore['playlistDetails']>) =>
    set((state) => ({
      playlistDetails: { ...state.playlistDetails, ...updates },
    })),

  toggleTrackLikeStatus: (trackId: string, isLiked: boolean) =>
    set((state) => {
      if (state.playlistDetails.tracks) {
        const updatedTracks = state.playlistDetails.tracks.map((track) =>
          track.id === trackId ? { ...track, hasLiked: isLiked } : track
        );
        return {
          playlistDetails: {
            ...state.playlistDetails,
            tracks: updatedTracks,
          },
        };
      }
      return state;
    }),

  isTrackLiked: (trackId: string) => {
    const state = get();
    const track = state.playlistDetails.tracks?.find((track) => track.id === trackId);
    return track ? track.hasLiked : false;
  },

  getCurrentTrackIndex: (trackId: string) => {
    const state = get();
    const index = state.playlistDetails.tracks?.findIndex((track) => track.id === trackId);
    return index !== undefined && index !== -1 ? index : -1; // Return -1 if track is not found
  },

  updateTrackAvailability: (index: number) => {
    set((state) => {
      const { tracks } = state.playlistDetails;
      if (!tracks || index === -1) {
        return {
          playlistDetails: {
            ...state.playlistDetails,
            hasNext: false,
            hasPrev: false,
          },
        };
      }

      const hasNext = index < tracks.length - 1;
      const hasPrev = index > 0;

      return {
        playlistDetails: {
          ...state.playlistDetails,
          hasNext,
          hasPrev,
        },
      };
    });
  },
}));

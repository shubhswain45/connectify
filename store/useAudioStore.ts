import { create } from 'zustand';

type AudioRefType = React.RefObject<HTMLAudioElement | null>;

interface AudioStore {
  audioDetails: {
    id: string;
    title: string;
    artist: string;
    duration: string;
    coverImageUrl: string | null;
    audioFileUrl: string;
    audioRef: AudioRefType | null; // Updated here
    isPlaying: boolean;
  };
  setAudioDetails: (audioDetails: Partial<AudioStore['audioDetails']>) => void;
  togglePlay: () => void;
}

export const useAudioStore = create<AudioStore>((set) => ({
  audioDetails: {
    id: '',
    title: '',
    artist: '',
    duration: '',
    coverImageUrl: null,
    audioFileUrl: '',
    audioRef: null,
    isPlaying: false,
  },
  setAudioDetails: (audioDetails) =>
    set((state) => ({
      audioDetails: { ...state.audioDetails, ...audioDetails },
    })),
  togglePlay: () =>
    set((state) => ({
      audioDetails: {
        ...state.audioDetails,
        isPlaying: !state.audioDetails.isPlaying,
      },
    })),
}));

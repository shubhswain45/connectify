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
    isPlaying: boolean;
    isFavorite: boolean
    audoRef: AudioRefType | null;
    repeatable: boolean
    isQueued: boolean
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
    isPlaying: false,
    isFavorite: false,
    audoRef: null,
    repeatable: false,
    isQueued: false
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

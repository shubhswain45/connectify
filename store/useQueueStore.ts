import { create } from "zustand";

interface AudioDetails {
  id: string; // Assuming `id` is a string; change to `number` if needed
  artist: string;
  duration: string;
  audioFileUrl: string;
  hasLiked: boolean;
  title: string;
  coverImageUrl: string | null;
}

class Queue {
  private items: AudioDetails[] = [];

  enqueue(track: AudioDetails): void {
    this.items.push(track);
  }

  dequeue(): AudioDetails | undefined {
    return this.items.shift();
  }

  peek(): AudioDetails | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  isElementInQueue(id: string): boolean {
    return this.items.some((item) => item.id === id);
  }

  removeTrackById(id: string): boolean {
    const initialLength = this.items.length;
    this.items = this.items.filter((track) => track.id !== id);
    return initialLength > this.items.length;
  }

  updateIsFavorite(id: string, isFavorite: boolean): boolean {
    const track = this.items.find((item) => item.id === id);
    if (track) {
      track.hasLiked = isFavorite;
      return true;
    }
    return false;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }

  toArray(): AudioDetails[] {
    return [...this.items];
  }
}

interface QueueStore {
  queue: Queue;
  addSongToQueue: (track: AudioDetails) => void;
  removeSongFromQueue: () => void;
  removeTrackById: (id: string) => boolean;
  isTrackInQueue: (id: string) => boolean;
  updateIsFavorite: (id: string, isFavorite: boolean) => boolean;
}

export const useQueueStore = create<QueueStore>((set, get) => ({
  queue: new Queue(),

  addSongToQueue: (track: AudioDetails) => set((state) => {
    state.queue.enqueue(track);
    return { queue: state.queue };
  }),

  removeSongFromQueue: () => set((state) => {
    state.queue.dequeue();
    return { queue: state.queue };
  }),

  removeTrackById: (id: string) => {
    const state = get();
    const wasRemoved = state.queue.removeTrackById(id);
    set({ queue: state.queue });
    return wasRemoved;
  },

  isTrackInQueue: (id: string) => {
    const state = get();
    return state.queue.isElementInQueue(id);
  },

  updateIsFavorite: (id: string, hasLiked: boolean) => {
    const state = get();
    const wasUpdated = state.queue.updateIsFavorite(id, hasLiked);
    set({ queue: state.queue });
    return wasUpdated;
  },
}));

import { create } from "zustand";

// Define the Zustand store interface
interface BackgroundState {
  bg: string;
  setBg: (newBg: string) => void;
  hydrateBg: () => void;
}

// Zustand store with client-side localStorage handling
export const useBackgroundStore = create<BackgroundState>((set) => {
  const isClient = typeof window !== "undefined" && typeof localStorage !== "undefined";

  return {
    bg: "#121212", // Default value for SSR
    setBg: (newBg) => {
      if (isClient) {
        localStorage.setItem("bg", newBg); // Save to localStorage
      }
      set({ bg: newBg });
    },
    hydrateBg: () => {
      if (isClient) {
        const storedBg = localStorage.getItem("bg") || "#121212";
        set({ bg: storedBg });
      }
    },
  };
});

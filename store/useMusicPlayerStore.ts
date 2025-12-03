import { STORAGE_KEYS } from "@/constants/store";
import { MusicPlayerActions, MusicPlayerState } from "@/type/store/musicPlayer";
import { AlbumItem } from "@/type/wezard/albums";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState: Omit<MusicPlayerState, 'audioElement'> = {
  currentSong: null,
  playlist: [],
  currentIndex: -1,
  isPlaying: false,
  progress: 0,
  volume: 1,
  isExpanded: false,
}

export const useMusicPlayerStore = create<MusicPlayerState & MusicPlayerActions>() (
  persist(
    (set, get) => ({
      ...initialState,
      audioElement: null,
      setPlaylist: (songs: AlbumItem[]) => {
        set({
          playlist: songs,
        });
      },
      setCurrentPlay: (song: AlbumItem) => {
        set({
          currentSong: song,
          currentIndex: 0,
          isPlaying: true,
          progress: 0,
        })
        const audioElement = get().audioElement;
        audioElement?.play().catch(console.error);
      },
      play: () => {
        const { audioElement, currentSong } = get();
        if (audioElement && currentSong) {
          audioElement.play().catch(console.error);
          set({ isPlaying: true });
        }
      },
      pause: () => {
        const { audioElement } = get();
        if (audioElement) {
          audioElement.pause();
          set({ isPlaying: false });
        }
      },

      togglePlay: () => {
        const { isPlaying, play, pause } = get();
        if (isPlaying) {
          pause();
        } else {
          play();
        }
      },

      next: () => {
        const { playlist, currentIndex, audioElement } = get();
        if (playlist.length === 0) return;

        const nextIndex = (currentIndex + 1) % playlist.length;
        set({
          currentIndex: nextIndex,
          currentSong: playlist[nextIndex],
          progress: 0,
          isPlaying: true,
        });

        if (audioElement) {
          setTimeout(() => {
            audioElement.play().catch(console.error);
          }, 0);
        }
      },

      prev: () => {
        const { playlist, currentIndex, audioElement } = get();
        if (playlist.length === 0) return;

        const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
        set({
          currentIndex: prevIndex,
          currentSong: playlist[prevIndex],
          progress: 0,
          isPlaying: true,
        });

        if (audioElement) {
          setTimeout(() => {
            audioElement.play().catch(console.error);
          }, 0);
        }
      },

      toggleExpand: () => {
        set((state) => ({ 
          isExpanded: !state.isExpanded 
        }));
      },

      setProgress: (progress: number) => {
        set({ progress });
      },

      setVolume: (volume: number) => {
        const { audioElement } = get();
        if (audioElement) {
          audioElement.volume = volume;
        }
        set({ volume });
      },

      setAudioElement: (audioElement: HTMLAudioElement) => {
        set({ audioElement });
      },

      seek: (time: number) => {
        const { audioElement, currentSong } = get();
        if (audioElement && currentSong) {
          audioElement.currentTime = time;
          set({ progress: (time / audioElement.duration) * 100 });
        }
      },

      clearPlayer: () => {
        const { audioElement } = get();
        if (audioElement) {
          audioElement.pause();
          audioElement.src = '';
        }
        set(initialState);
      },
    }),
    {
      name: STORAGE_KEYS.MUSIC_PLAYER_STORE,
      partialize: (state) => ({
        volume: state.volume,
        isExpanded: state.isExpanded,
      }),
    }
  )
)
import { AlbumItem } from "../wezard/albums";

export interface MusicPlayerState {
  currentSong: null | AlbumItem;
  playlist: AlbumItem[];
  currentIndex: number;
  isPlaying: boolean;
  progress: number;
  volume: number;
  isExpanded: boolean;
  audioElement: HTMLAudioElement | null;
}

export interface MusicPlayerActions {
  setPlaylist: (songs: AlbumItem[]) => void;
  setCurrentPlay: (song: AlbumItem) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  toggleExpand: () => void;
  setProgress: (progress: number) => void;
  setVolume: (volume: number) => void;
  setAudioElement: (audio: HTMLAudioElement) => void;
  seek: (time: number) => void;
  clearPlayer: () => void;
}
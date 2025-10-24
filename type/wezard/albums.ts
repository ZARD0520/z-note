export interface Song {
  id: string;
  name: string;
  url: string;
  duration: string;
  lyrics: string;
}

export interface Album {
  id: string;
  name: string;
  cover: string;
  type: 'album' | 'single';
  songs: Song[];
  releaseDate: string;
}

export interface AlbumGridProps {
  albums: Album[]
  onAlbumClick: (album: Album) => void
}

export interface AlbumBoxProps {
  album: Album;
  onClose: () => void;
  onSongPlay: (song: Song) => void;
  onShowLyrics: (song: Song) => void;
  currentSong?: Song | null;
}

export interface LyricsModalProps {
  song: Song;
  onClose: () => void;
  onPlay: (song: Song) => void;
}
export interface Song {
  id: string;
  title: string;
  duration: string;
  lyrics: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
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
  artist: string;
  onClose: () => void;
  onPlay: (song: Song) => void;
}
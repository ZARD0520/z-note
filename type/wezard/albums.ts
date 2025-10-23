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
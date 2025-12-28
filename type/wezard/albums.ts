import { PaginationParams, PaginationType } from '../common/pagination'

export enum AlbumType {
  IMAGE = 'image',
  VIDEO = 'video',
  MUSIC = 'music',
}

export enum AlbumSubType {
  ALBUM = 'album',
  SINGLE = 'single',
}

export interface AlbumItem {
  id: number
  name: string
  url: string
  artist: string
  cover: string
  duration: number
  lyrics: string
  type: AlbumType
  album: number
}

export interface Album {
  id: number
  name: string
  cover: string
  type: AlbumType
  subType: AlbumSubType
  mediaCount: number
  description: string
  releaseDate: number
}

export interface AlbumListParams extends PaginationParams {
  type: AlbumType
  albumName?: string
}

export interface AlbumDetailParams {
  type: AlbumType
  id?: number
  name?: string
}

export interface AlbumGridProps {
  initialData: Album[]
  initialPagination: PaginationType
}

export interface AlbumBoxProps {
  album: Album
  onClose: () => void
  onSongPlay: (song: AlbumItem) => void
  onShowLyrics: (song: AlbumItem) => void
  onSetPlayList: (songs: AlbumItem[]) => void
  currentSong?: AlbumItem | null
}

export interface LyricsModalProps {
  song: AlbumItem
  onClose: () => void
  onPlay: (song: AlbumItem) => void
}

export interface AudioElementProps {
  audioRef: React.RefObject<HTMLAudioElement>
  currentSong: AlbumItem | null
}

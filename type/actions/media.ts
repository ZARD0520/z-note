export interface getListParams {
  current: number
  size: number
  type: 'image' | 'audio' | 'video'
}

export interface MediaFile {
  url: string;
  filename: string;
  type: 'image' | 'audio' | 'video'
  album?: string
  releaseDate?: string
}
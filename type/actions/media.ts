export interface getListParams {
  current: number
  size: number
  type: 'Photos' | 'Albums' | 'Videos'
}

export interface MediaFile {
  url: string
  filename: string
  type: 'Photos' | 'Albums' | 'Videos'
  album?: string
  releaseDate?: string
  location?: string
}

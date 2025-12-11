import { RequestList } from '@/type/common/request'
import requestClient from '../request'
import { Album, AlbumDetailParams, AlbumItem, AlbumListParams } from '@/type/wezard/albums'

export const getAlbumList = async (params: AlbumListParams) => {
  return await requestClient.get<RequestList<Album[]>>('/media-resources/list', params)
}

export const getAlbumDetail = async (params: AlbumDetailParams) => {
  return await requestClient.get<AlbumItem[]>('/media-resources/detail', params)
}

import { PaginationType } from './pagination'

export type RequestMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface RequestOptions {
  params?: Record<string, any>
  data?: BodyInit | Record<string, any>
  headers?: HeadersInit
  timeout?: number
  withCredentials?: boolean
}

export interface RequestList<T> {
  data: T
  pagination: PaginationType
}

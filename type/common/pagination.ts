export type PaginationType = {
  current: number
  limit: number
  pages: number
  total: number
}

export interface PaginationParams {
  current: number
  limit: number
}

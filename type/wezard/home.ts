import { StaticImageData } from 'next/image'

export interface WezardHomeProps {
  dict: Record<string, any>
}

export interface HomeContentListProps {
  title: string
  background: string | StaticImageData
  href: string
}

export interface WezardSideNavProps {
  contentList: Array<HomeContentListProps>
  isMobile: boolean
  currentPage: number
  goToPage: (page: number) => void
  dict: Record<string, any>
}

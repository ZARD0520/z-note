export interface WezardHomeProps {
  dict: any
}

export interface HomeContentListProps {
  title: string
  background: string
  href: string
}

export interface WezardSideNavProps {
  contentList: Array<HomeContentListProps>
  isMobile: boolean
}
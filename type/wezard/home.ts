import { StaticImageData } from 'next/image'

export interface HomeContentListProps {
  title: string
  background: string | StaticImageData
  href: string
}

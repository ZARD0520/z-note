'use client'

import { WezardHomeProps } from "@/type/wezard/home"
import SideNav from "./sidenav"
import { useMemo, useState } from "react"
import { usePageScroll } from "@/hooks/useScroll"
import { useWindowSize } from "@/hooks/useWindowSize"
import Link from "next/link"

const WezardHome: React.FC<WezardHomeProps> = ({dict}) => {
  const contentList = useMemo(() => [
    {
      title: dict.zard.nav.introduce,
      background: "/media/images/2.jpg",
      href: '/wezard'
    },
    {
      title: dict.zard.nav.album,
      background: "/media/images/1.jpg",
      href: '/wezard/music'
    },
    {
      title: dict.zard.nav.photo,
      background: "/media/images/zard11.jpg",
      href: '/wezard/photo'
    },
    {
      title: dict.zard.nav.mv,
      background: "/media/images/zard002.jpg",
      href: '/wezard/video'
    }
  ], [dict])

  const { isMobile } = useWindowSize()
  const { currentPage, goToPage } = usePageScroll({
      totalPages: contentList.length, 
      initialPage: 0,
      enableWheel: true,
      enableSwipe: true 
    })
  const currentContent = useMemo(() => contentList.find((item, index) => index === currentPage), [currentPage, contentList])

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-row" style={{backgroundImage: `url('${currentContent?.background}')`}}>
      <div className="flex-1 flex items-center justify-center text-2xl text-gray-200">
        { currentContent && 
          <Link href={currentContent.href}>
            ZARD·{currentContent.title}
          </Link>
        }
      </div>
      <SideNav goToPage={goToPage} contentList={contentList} isMobile={isMobile} />
    </div>
  )
}

export default WezardHome
'use client'

import { WezardHomeProps } from "@/type/wezard/home"
import SideNav from "./sidenav"
import { useMemo, useState } from "react"
import { usePageScroll } from "@/hooks/useScroll"
import { useWindowSize } from "@/hooks/useWindowSize"

const WezardHome: React.FC<WezardHomeProps> = ({dict}) => {
  const contentList = useMemo(() => [
    {
      title: dict.zard.nav.introduce,
      background: '',
      href: '/wezard'
    },
    {
      title: dict.zard.nav.album,
      background: '',
      href: '/wezard/music'
    },
    {
      title: dict.zard.nav.photo,
      background: '',
      href: '/wezard/photo'
    },
    {
      title: dict.zard.nav.mv,
      background: '',
      href: '/wezard/video'
    }
  ], [dict])

  const { isMobile } = useWindowSize()
  const { currentPage } = usePageScroll({
      totalPages: contentList.length, 
      initialPage: 0,
      enableWheel: true,
      enableSwipe: true 
    })
  const currentContent = useMemo(() => contentList.find((item, index) => index === currentPage), [currentPage, contentList])

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-row" style={{backgroundImage: `url(${currentContent?.background})`}}>
      <div className="flex-1">
        {currentContent?.title}
      </div>
      <SideNav contentList={contentList} isMobile={isMobile} />
    </div>
  )
}

export default WezardHome
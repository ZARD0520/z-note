'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePageScroll } from '@/hooks/useScroll'
import { useWindowSize } from '@/hooks/useWindowSize'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SideNav from '@/components/wezard/sidenav'
import { useI18n } from '@/i18n'

const WezardHome: React.FC = () => {
  const { dict } = useI18n()
  const [mounted, setMounted] = useState(false)
  const contentList = useMemo(
    () => [
      {
        title: dict.zard.nav.introduce,
        background: '/media/images/1.jpg',
        href: '/wezard/introduce',
      },
      {
        title: dict.zard.nav.album,
        background: '/media/images/zard002.jpg',
        href: '/wezard/music',
      },
      {
        title: dict.zard.nav.photo,
        background: '/media/images/zard11.jpg',
        href: '/wezard/photo',
      },
      {
        title: dict.zard.nav.mv,
        background: '/media/images/7.jpg',
        href: '/wezard/video',
      },
    ],
    [dict]
  )

  const { isMobile } = useWindowSize()

  // 确保在客户端 hydration 完成后再使用真实的 isMobile 值
  useEffect(() => {
    setMounted(true)
  }, [])
  const { currentPage, goToPage } = usePageScroll({
    totalPages: contentList.length,
    initialPage: 0,
    enableWheel: true,
    enableSwipe: true,
  })

  const currentContent = useMemo(
    () => contentList.find((item, index) => index === currentPage),
    [currentPage, contentList]
  )

  const prevPageRef = useRef(0)

  const getAnimationDirection = () => {
    const direction = currentPage > prevPageRef.current ? 'next' : 'prev'
    prevPageRef.current = currentPage
    return direction
  }

  // 背景模糊效果变体
  const blurVariants = {
    enter: {
      opacity: 0.6,
      filter: 'blur(40px)',
      scale: 1.2,
    },
    center: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
    },
    exit: {
      opacity: 0.6,
      filter: 'blur(40px)',
      scale: 1.2,
    },
  }

  // 字体动画变体
  const textVariants = {
    enter: (direction: string) => ({
      opacity: 0,
      scale: 1.2,
      filter: 'blur(10px)',
    }),
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (direction: string) => ({
      opacity: 0,
      scale: 1.2,
      filter: 'blur(10px)',
    }),
  }

  const direction = getAnimationDirection()

  // 根据记录位置跳转
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  useEffect(() => {
    const paramsKey = searchParams.get('key')
    const toPage = Number(paramsKey) - 1
    if (paramsKey) {
      goToPage(toPage)
      router.replace(pathname)
    }
  }, [goToPage, pathname, router, searchParams])

  return (
    <div className="min-h-screen flex flex-row relative overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentPage}
          className="absolute inset-0 bg-cover bg-[position:60%_50%]"
          style={{ backgroundImage: `url('${currentContent?.background}')` }}
          variants={blurVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.8,
            ease: 'easeInOut',
          }}
        />
      </AnimatePresence>

      {/* 内容层 - 添加字体动画 */}
      <div className="flex-1 flex items-center justify-center text-2xl text-gray-200 relative z-10">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          {currentContent && (
            <motion.div
              key={currentPage}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
              }}
            >
              <Link
                href={currentContent.href}
                className="transition-all duration-300 hover:scale-105 hover:text-white px-6 py-3 inline-block"
              >
                ZARD·{currentContent.title}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SideNav
        currentPage={currentPage}
        goToPage={goToPage}
        contentList={contentList}
        isMobile={mounted ? isMobile : false}
      />
    </div>
  )
}

export default WezardHome

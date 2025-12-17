'use client'

import { menuList } from '@/constants/wezard'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { usePathname, useRouter } from 'next/navigation'

export const FloatingBackButton = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { exitPlayer } = useMusicPlayerStore()

  const handleNavigate = () => {
    const params = new URLSearchParams()

    menuList.forEach((menu) => {
      if (pathname.includes(menu.label)) {
        params.set('key', menu.key as string)
        if (menu.label === 'music') {
          exitPlayer()
        }
      }
    })

    router.replace(`/wezard?${params.toString()}`)
  }

  return (
    <button
      onClick={handleNavigate}
      className="fixed top-4 left-4 z-48 bg-slate-600 bg-opacity-50 text-white px-3 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </button>
  )
}

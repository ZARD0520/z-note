'use client'

import { AudioElementProps } from '@/type/wezard/albums'

export default function AudioElement({ audioRef, currentSong }: AudioElementProps) {
  // 如果没有当前歌曲，不渲染音频元素
  if (!currentSong) {
    return null
  }

  return <audio ref={audioRef} src={currentSong.url} preload="metadata" className="hidden" />
}

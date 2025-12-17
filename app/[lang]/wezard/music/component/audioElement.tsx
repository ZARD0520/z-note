'use client'

import { AudioElementProps } from '@/type/wezard/albums'
import { useMemo } from 'react'

export default function AudioElement({ audioRef, currentSong }: AudioElementProps) {
  const audioEle = useMemo(() => {
    if (!currentSong) {
      return null
    }
    return <audio ref={audioRef} src={currentSong.url} preload="metadata" className="hidden" />
  }, [audioRef, currentSong])
  return audioEle
}

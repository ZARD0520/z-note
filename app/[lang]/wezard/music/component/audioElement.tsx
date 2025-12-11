'use client'
import { useAudioController } from '@/hooks/useAudioController'

export default function AudioElement() {
  const { audioRef, currentSong } = useAudioController()

  // 如果没有当前歌曲，不渲染音频元素
  if (!currentSong) {
    return null
  }

  return <audio ref={audioRef} src={currentSong.url} preload="metadata" className="hidden" />
}

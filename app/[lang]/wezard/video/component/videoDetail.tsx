'use client'

import { Album, AlbumItem, AlbumType } from '@/type/wezard/albums'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { getAlbumDetail } from '@/api'
import { timestampToUTCString, formatSeconds } from '@/utils/date'
import { useI18n } from '@/i18n'

interface VideoDetailProps {
  video: Album
  onClose: () => void
}

export default function VideoDetail({ video, onClose }: VideoDetailProps) {
  const { dict } = useI18n()
  const [videos, setVideos] = useState<AlbumItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    getAlbumDetail({ type: AlbumType.VIDEO, id: video.id })
      .then((res) => {
        setVideos(res)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [video.id])

  const currentVideo = videos[currentIndex]

  // 视频事件处理
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      // 自动播放下一个视频
      if (currentIndex < videos.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }

    videoElement.addEventListener('timeupdate', handleTimeUpdate)
    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata)
    videoElement.addEventListener('ended', handleEnded)

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate)
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata)
      videoElement.removeEventListener('ended', handleEnded)
    }
  }, [currentIndex, videos.length])

  // 切换视频时重置播放状态
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [currentIndex])

  const handlePlayPause = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isPlaying) {
      videoElement.pause()
    } else {
      videoElement.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const videoElement = videoRef.current
    if (!videoElement || !duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    videoElement.currentTime = newTime
    setCurrentTime(newTime)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="overflow-y-auto bg-gray-900 w-full h-full overflow-hidden flex flex-col">
        {/* 头部信息 */}
        <div className="sticky top-0 z-10 bg-gray-900 bg-opacity-95 backdrop-blur-sm px-6 py-4 flex justify-between items-center">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold truncate">{video.name}</h2>
            {video.description && (
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">{video.description}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {timestampToUTCString(video.releaseDate, 'date')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-800 flex-shrink-0 ml-4"
          >
            ✕
          </button>
        </div>

        {/* 视频播放区域 */}
        <div className="flex flex-col items-center justify-center flex-1 p-6 pt-0">
          {currentVideo && (
            <div className="aspect-video w-full max-w-4xl mx-auto">
              {/* 视频播放器 */}
              <div className="w-full h-full relative bg-black rounded-lg overflow-hidden shadow-2xl">
                <video
                  ref={videoRef}
                  src={currentVideo.url}
                  poster={currentVideo.cover}
                  className="w-full h-full"
                  playsInline
                />

                {/* 播放控制遮罩 */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center group">
                  {/* 播放/暂停按钮 */}
                  <button
                    onClick={handlePlayPause}
                    className="w-20 h-20 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                    aria-label={isPlaying ? dict.common.pause : dict.common.play}
                  >
                    {isPlaying ? (
                      <span className="text-3xl text-gray-900">⏸</span>
                    ) : (
                      <span className="text-3xl text-gray-900 ml-1">▶</span>
                    )}
                  </button>
                </div>

                {/* 进度条 */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 bg-opacity-50 cursor-pointer group/progress"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"></div>
                  </div>
                </div>

                {/* 时间显示 */}
                <div className="absolute bottom-2 right-4 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {formatSeconds(currentTime)} / {formatSeconds(duration)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

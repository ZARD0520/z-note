'use client'

import { Album, AlbumItem, AlbumType } from '@/type/wezard/albums'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { getAlbumDetail } from '@/api'
import { timestampToUTCString, formatSeconds } from '@/utils/date'

interface VideoDetailProps {
  video: Album
  onClose: () => void
}

export default function VideoDetail({ video, onClose }: VideoDetailProps) {
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
      <div className="overflow-y-auto bg-gray-900 w-full h-full overflow-hidden">
        {/* 头部信息 */}
        <div className="sticky top-0 z-10 bg-gray-900 bg-opacity-95 backdrop-blur-sm border-b border-gray-700 px-6 py-4 flex justify-between items-center">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold truncate">{video.name}</h2>
            {video.description && (
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">{video.description}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {timestampToUTCString(video.releaseDate, 'date')} · {videos.length} 个视频
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
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-6">
          {currentVideo && (
            <div className="w-full max-w-5xl">
              {/* 视频播放器 */}
              <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl">
                <video
                  ref={videoRef}
                  src={currentVideo.url}
                  poster={currentVideo.cover}
                  className="w-full h-auto max-h-[70vh]"
                  playsInline
                />

                {/* 播放控制遮罩 */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center group">
                  {/* 播放/暂停按钮 */}
                  <button
                    onClick={handlePlayPause}
                    className="w-20 h-20 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                    aria-label={isPlaying ? '暂停' : '播放'}
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

              {/* 视频信息 */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white">{currentVideo.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      {formatSeconds(currentVideo.duration)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {currentIndex + 1} / {videos.length}
                    </span>
                  </div>
                </div>
                {currentVideo.artist && (
                  <p className="text-sm text-gray-400 mb-2">作者: {currentVideo.artist}</p>
                )}
                {currentVideo.lyrics && (
                  <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">简介</h4>
                    <p className="text-sm text-gray-400 whitespace-pre-wrap leading-relaxed">
                      {currentVideo.lyrics}
                    </p>
                  </div>
                )}
              </div>

              {/* 导航按钮 */}
              {videos.length > 1 && (
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                      currentIndex === 0
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-gray-600 text-white hover:scale-105'
                    }`}
                  >
                    <span className="mr-2">◀</span>
                    上一个
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentIndex === videos.length - 1}
                    className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                      currentIndex === videos.length - 1
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-gray-600 text-white hover:scale-105'
                    }`}
                  >
                    下一个
                    <span className="ml-2">▶</span>
                  </button>
                </div>
              )}

              {/* 视频列表缩略图 */}
              {videos.length > 1 && (
                <div className="mt-8">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">视频列表</h4>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {videos.map((item, index) => (
                      <div
                        key={item.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`relative flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                          index === currentIndex
                            ? 'border-blue-500 scale-105'
                            : 'border-transparent hover:border-gray-500 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={item.cover}
                          alt={item.name}
                          width={128}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                          <span className="text-white opacity-0 hover:opacity-100 transition-opacity">
                            ▶
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

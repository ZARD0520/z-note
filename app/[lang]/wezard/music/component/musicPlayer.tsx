import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import Image from 'next/image'
import { formatSeconds } from '@/utils/date'
import { useState, useEffect } from 'react'

export default function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    progress,
    isExpanded,
    togglePlay,
    next,
    prev,
    toggleExpand,
    seek,
  } = useMusicPlayerStore()

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // 更新当前时间和总时长
  useEffect(() => {
    const audio = document.querySelector('audio')
    if (audio) {
      const updateTime = () => {
        setCurrentTime(audio.currentTime)
        setDuration(audio.duration || 0)
      }
      audio.addEventListener('timeupdate', updateTime)
      audio.addEventListener('loadedmetadata', updateTime)
      return () => {
        audio.removeEventListener('timeupdate', updateTime)
        audio.removeEventListener('loadedmetadata', updateTime)
      }
    }
  }, [currentSong])

  // 进度条点击处理
  const handleProgressClick = (
    e: React.MouseEvent<HTMLDivElement>,
    type: 'normal' | 'circle' = 'normal'
  ) => {
    let percent = 0
    const rect = e.currentTarget.getBoundingClientRect()
    if (type === 'normal') {
      percent = (e.clientX - rect.left) / rect.width
    } else if (type === 'circle') {
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      const deltaX = clickX - centerX
      const deltaY = clickY - centerY

      let angle = Math.atan2(deltaY, deltaX)
      if (angle < 0) angle += 2 * Math.PI

      angle += Math.PI / 2
      angle = angle % (2 * Math.PI)

      percent = angle / (2 * Math.PI)
    }
    const audio = document.querySelector('audio')
    if (audio && audio.duration) {
      const newTime = percent * audio.duration
      seek(newTime)
    }
  }

  // 如果没有当前歌曲，不渲染播放器
  if (!currentSong) return null

  if (isExpanded) {
    // 展开状态 - 完整播放器
    return (
      <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-black/80 dark:bg-black/90 z-50">
        <div className="relative bg-white dark:bg-gray-900 w-full h-full md:w-[80%] md:h-[85%] lg:w-[70%] lg:h-[80%] rounded-none md:rounded-lg flex flex-col overflow-hidden">
          {/* 头部：收起按钮 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="relative rounded-lg w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
                <Image
                  src={currentSong.cover}
                  alt={currentSong.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate text-sm md:text-base">
                  {currentSong.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 truncate">
                  {currentSong.artist}
                </p>
              </div>
            </div>
            <button
              onClick={toggleExpand}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-xl md:text-2xl"
              title="收起播放器"
            >
              ✕
            </button>
          </div>

          {/* 主体内容区域 */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* 左侧：封面图片 */}
            <div className="flex-shrink-0 w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
              <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={currentSong.cover}
                  alt={currentSong.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* 右侧：歌词区域 */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              <div className="max-w-2xl mx-auto">
                <h4 className="text-lg md:text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  歌词
                </h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 md:p-6 min-h-[200px]">
                  {currentSong.lyrics ? (
                    <pre className="text-sm md:text-base leading-relaxed whitespace-pre-wrap text-gray-700 dark:text-gray-300 font-sans">
                      {currentSong.lyrics}
                    </pre>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">暂无歌词</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 底部：控制区域 */}
          <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            {/* 进度条 */}
            <div
              className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 md:h-2 cursor-pointer group"
              onClick={handleProgressClick}
            >
              <div
                className="bg-blue-500 dark:bg-blue-600 h-full transition-all relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-blue-500 dark:bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            {/* 时间显示和控制按钮 */}
            <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
              <div className="flex items-center justify-between mb-4">
                {/* 时间显示 */}
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {formatSeconds(currentTime)} / {formatSeconds(duration)}
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4 md:space-x-8">
                {/* 上一首 */}
                <button
                  onClick={prev}
                  className="p-2 md:p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-xl md:text-2xl hover:scale-110 active:scale-95"
                  title="上一首"
                >
                  ⏮
                </button>

                {/* 播放/暂停 */}
                <button
                  onClick={togglePlay}
                  className="p-3 md:p-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-full transition-all text-lg md:text-xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95"
                  title={isPlaying ? '暂停' : '播放'}
                >
                  {isPlaying ? (
                    <span className="text-xl md:text-2xl">⏸</span>
                  ) : (
                    <span className="text-xl md:text-2xl ml-0.5">▶</span>
                  )}
                </button>

                {/* 下一首 */}
                <button
                  onClick={next}
                  className="p-2 md:p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-xl md:text-2xl hover:scale-110 active:scale-95"
                  title="下一首"
                >
                  ⏭
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 收缩状态 - 只有一个小按钮
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 p-2">
        {/* 环形进度条容器 */}
        <div className="relative w-14 h-14 mr-1">
          {/* 环形进度条 SVG */}
          <svg
            className="absolute w-full h-full transform -rotate-90 cursor-pointer"
            onClick={(e: any) => handleProgressClick(e, 'circle')}
          >
            {/* 背景圆环 */}
            <circle
              cx="50%"
              cy="50%"
              r="22" // 半径，根据封面大小调整
              strokeWidth="2"
              stroke="currentColor"
              className="text-gray-200 dark:text-gray-700"
              fill="none"
            />

            {/* 进度圆环 */}
            <circle
              cx="50%"
              cy="50%"
              r="22"
              strokeWidth="2"
              stroke="currentColor"
              className="text-blue-500 transition-all duration-300"
              fill="none"
              strokeDasharray={2 * Math.PI * 22} // 圆周长
              strokeDashoffset={2 * Math.PI * 22 * (1 - progress / 100)} // 根据进度计算偏移
              strokeLinecap="round"
            />

            {/* 点击感应区域（透明但可点击） */}
            <circle
              cx="50%"
              cy="50%"
              r="26" // 比实际圆环大一点，方便点击
              strokeWidth="8"
              stroke="transparent"
              fill="none"
              className="hover:opacity-50"
            />
          </svg>

          {/* 歌曲封面 - 在进度条中心 */}
          <div className="absolute inset-2 rounded-full overflow-hidden">
            <Image
              src={currentSong.cover}
              alt={currentSong.name}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 播放/暂停按钮 */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 text-base"
          title={isPlaying ? '暂停' : '播放'}
        >
          {isPlaying ? (
            <span className="w-3 h-3 flex items-center justify-center">⏸</span>
          ) : (
            <span className="ml-0.5">▶</span>
          )}
        </button>

        {/* 展开按钮 */}
        <button
          onClick={toggleExpand}
          className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 text-base"
          title="展开播放器"
        >
          <span className="transform rotate-90">→</span>
        </button>
      </div>
    </div>
  )
}

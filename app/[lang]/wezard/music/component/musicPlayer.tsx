import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import Image from 'next/image'
import { formatSeconds } from '@/utils/date'
import { useState, useEffect } from 'react'
import { useWindowSize } from '@/hooks/useWindowSize'
import DraggableComponent from '@/components/common/z-drag'

export default function MusicPlayer({ dict }: { dict: Record<string, any> }) {
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

  const [isShowLyrics, setIsShowLyrics] = useState(false)

  const { isSm, width, height } = useWindowSize()

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

  // 点击显示/隐藏歌词
  const handleShowLyrics = (isShow: boolean) => {
    if (isSm) {
      setIsShowLyrics(isShow)
    }
  }

  // 如果没有当前歌曲，不渲染播放器
  if (!currentSong) return null

  if (isExpanded) {
    // 展开状态 - 完整播放器
    return (
      <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-black/80 bg-black/90 z-50">
        <div className="pb-8 relative bg-gray-900 w-full h-full md:w-[80%] md:h-[85%] lg:w-[70%] lg:h-[80%] xl:w-[60%] 2xl:w-[50%] rounded-none md:rounded-lg flex flex-col overflow-hidden">
          {/* 头部：收起按钮 */}
          <div className="flex items-center justify-between p-8">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate text-sm md:text-base">
                  {currentSong.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 truncate">{currentSong.artist}</p>
              </div>
            </div>
            <button
              onClick={toggleExpand}
              className="p-2 text-gray-400 hover:text-white transition-colors text-xl md:text-2xl"
              title="收起播放器"
            >
              ✕
            </button>
          </div>

          {/* 主体内容区域 */}
          <div
            onClick={() => handleShowLyrics(!isShowLyrics)}
            className="sm:cursor-pointer md:cursor-auto flex-1 flex flex-col md:flex-row items-center justify-center overflow-y-auto"
          >
            {/* 左侧：封面图片 */}
            {isShowLyrics && isSm ? (
              ''
            ) : (
              <div className="flex-shrink-0 w-full md:w-1/2 h-1/2 md:h-full flex items-center md:items-start justify-center p-4 md:p-8">
                <div className="relative w-[72%] md:w-[80%] max-w-md aspect-square">
                  <div className="absolute inset-0 rounded-full bg-black bg-opacity-60 shadow-2xl shadow-gray-900/50 border-[8px] md:border-[10px] border-gray-800">
                    <div className="absolute inset-0 rounded-full border-opacity-70"></div>
                    <div className="absolute inset-8 rounded-full border-black border-[8px]"></div>
                  </div>
                  <div className="absolute inset-12 md:inset-6 rounded-full overflow-hidden z-5">
                    <Image
                      key={currentSong.id}
                      src={currentSong.cover}
                      alt={currentSong.name}
                      fill
                      className="object-cover animate-spin-slow"
                      style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                      priority
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 右侧：歌词区域 */}
            {isShowLyrics || !isSm ? (
              <div className="md:self-start h-full flex-1 overflow-y-auto p-4 md:p-8 md:bg-gray-800 md:mr-8 md:rounded-lg">
                <div className="max-w-2xl mx-auto">
                  <div className="min-h-[200px]">
                    {currentSong.lyrics ? (
                      <pre className="text-sm md:text-base leading-relaxed whitespace-pre-wrap text-gray-300 font-sans">
                        {currentSong.lyrics}
                      </pre>
                    ) : (
                      <p className="text-gray-400 text-center py-8">{dict.zard.player.noLyrics}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>

          {/* 底部：控制区域 */}
          <div className="w-[90%] mt-8 self-center bg-gray-900">
            {/* 进度条 */}
            <div
              className="w-full bg-gray-700 h-1.5 md:h-2 cursor-pointer group"
              onClick={handleProgressClick}
            >
              <div
                className="bg-white bg-opacity-40 h-full transition-all relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            {/* 时间显示和控制按钮 */}
            <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
              <div className="flex items-center justify-between mb-4">
                {/* 时间显示 */}
                <div className="text-xs md:text-sm text-gray-400">
                  {formatSeconds(currentTime)} / {formatSeconds(duration)}
                </div>
              </div>

              <div className="flex items-center justify-center space-x-12">
                {/* 上一首 */}
                <button
                  onClick={prev}
                  className="p-2 md:p-3 text-gray-400 hover:text-white transition-colors text-xl md:text-2xl hover:scale-110 active:scale-95"
                  title="上一首"
                >
                  ⏮
                </button>

                {/* 播放/暂停 */}
                <button
                  onClick={togglePlay}
                  className="p-3 md:p-4 text-white rounded-full transition-all text-2xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95"
                  title={isPlaying ? dict.zard.player.pause : dict.zard.player.play}
                >
                  {isPlaying ? (
                    <span className="text-2xl">⏸</span>
                  ) : (
                    <span className="text-2xl">▶</span>
                  )}
                </button>

                {/* 下一首 */}
                <button
                  onClick={next}
                  className="p-2 md:p-3 text-gray-400 hover:text-white transition-colors text-xl md:text-2xl hover:scale-110 active:scale-95"
                  title={dict.zard.player.next}
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
    <DraggableComponent initialPosition={{ x: width - 180, y: height - 100 }}>
      <div className="flex items-center space-x-2 bg-gray-800 rounded-full shadow-lg border border-gray-700 p-2">
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
              className="text-gray-700"
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
          className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 text-base"
          title={dict.zard.player.expand}
        >
          <span className="transform rotate-90">→</span>
        </button>
      </div>
    </DraggableComponent>
  )
}

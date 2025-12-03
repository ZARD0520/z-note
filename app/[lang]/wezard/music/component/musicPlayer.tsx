import { useMusicPlayerStore } from "@/store/useMusicPlayerStore";
import Image from "next/image";

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
    setProgress
  } = useMusicPlayerStore();

  // 进度条点击处理
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>, type: 'normal' | 'circle' = 'normal') => {
    let percent = 0
    const rect = e.currentTarget.getBoundingClientRect();
    if(type === 'normal') {
      percent = (e.clientX - rect.left) / rect.width;
    } else if(type === 'circle') {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      const deltaX = clickX - centerX;
      const deltaY = clickY - centerY;

      let angle = Math.atan2(deltaY, deltaX);
      if (angle < 0) angle += 2 * Math.PI;

      angle += Math.PI / 2;
      angle = angle % (2 * Math.PI);

      percent = angle / (2 * Math.PI)
    }
    const newProgress = percent * 100;
    const audio = document.querySelector('audio');
    if (audio && audio.duration) {
      const newTime = percent * audio.duration;
      setProgress(newProgress)
      seek(newTime);
    }
  };

  // 如果没有当前歌曲，不渲染播放器
  if (!currentSong) return null;

  if (isExpanded) {
    // 展开状态 - 完整播放器
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl z-50">
        {/* 进度条 */}
        <div 
          className="w-full bg-gray-200 dark:bg-gray-700 h-1 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="bg-blue-500 h-1 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* 歌曲信息 */}
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <div className="relative rounded-lg w-16 h-16 flex-shrink-0">
                <Image
                  src={currentSong.cover}
                  alt={currentSong.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                  {currentSong.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {currentSong.artist}
                </p>
              </div>
            </div>

            {/* 控制按钮 */}
            <div className="flex items-center space-x-6 mx-8">
              <button
                onClick={prev}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-xl"
                title="上一首"
              >
                ⏮
              </button>
              <button
                onClick={togglePlay}
                className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors text-lg w-12 h-12 flex items-center justify-center"
                title={isPlaying ? '暂停' : '播放'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button
                onClick={next}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-xl"
                title="下一首"
              >
                ⏭
              </button>
            </div>

            {/* 右侧操作 */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleExpand}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                title="收起播放器"
              >
                ↓
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
  );
}
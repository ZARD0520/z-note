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
  } = useMusicPlayerStore();

  // 进度条点击处理
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const audio = document.querySelector('audio');
    if (audio && audio.duration) {
      const newTime = percent * audio.duration;
      seek(newTime);
    }
  };

  // 如果没有当前歌曲，不渲染播放器
  if (!currentSong) return null;

  if (isExpanded) {
    // 展开状态 - 完整播放器
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-2xl z-50">
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
              <Image
                src={currentSong.cover}
                alt={currentSong.name}
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
              />
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
        {/* 歌曲封面小图 */}
        <Image
          src={currentSong.cover}
          alt={currentSong.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        
        {/* 播放/暂停按钮 */}
        <button
          onClick={togglePlay}
          className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors text-sm"
          title={isPlaying ? '暂停' : '播放'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        
        {/* 展开按钮 */}
        <button
          onClick={toggleExpand}
          className="w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors text-sm"
          title="展开播放器"
        >
          ↑
        </button>
      </div>
      
      {/* 迷你进度条 */}
      <div 
        className="absolute -top-1 left-0 right-0 bg-gray-300 dark:bg-gray-600 h-1 rounded-full cursor-pointer"
        onClick={handleProgressClick}
      >
        <div
          className="bg-blue-500 h-1 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
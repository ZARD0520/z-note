'use client'

import { AlbumGridProps, AlbumType } from "@/type/wezard/albums";
import { Album, AlbumItem } from "@/type/wezard/albums"
import AlbumBox from "./albumBox"
import LyricsModal from "./lyticsModal"
import { useCallback, useEffect, useState } from "react"
import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowSize";
import { getAlbumList } from "@/api";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useWaterfallFlow from "@/hooks/useWaterfallFlow";

export default function AlbumGrid({ dict, initialData, initialPagination }: AlbumGridProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [currentSong, setCurrentSong] = useState<AlbumItem | null>(null);
  const [showLyrics, setShowLyrics] = useState(false);
  const [currentPagination, setCurrentPagination] = useState(initialPagination);
  const [albumsData, setAlbumsData] = useState<Album[]>(initialData);
  const [hasMore, setHasMore] = useState(true)
  const [isClient, setIsClient] = useState(false);

  const { isMobile } = useWindowSize()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLoadMore = useCallback(async () => {
    try {
      const res = await getAlbumList({ type: AlbumType.MUSIC, current: currentPagination.current + 1, limit: currentPagination.limit })

      if (res.data?.length) {
        setAlbumsData(prev => [...prev, ...(res?.data?.map((item)=>({ ...item, items:[] })) || [])])
      }
      const hasMore = res?.pagination?.current < res?.pagination?.pages

      setHasMore(hasMore)
      if (hasMore) {
        setCurrentPagination(prev => ({...prev, current: prev.current + 1}))
      }
    } catch (error) {
      console.error('获取专辑列表失败:', error);
    }
  }, [currentPagination])

  const { loading, error, triggerRef, reset } = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    hasMore,
    threshold: 50
  })

  const { columnData,
    containerRef,
    columnWidth,
    registerItemHeight } = useWaterfallFlow(albumsData, {
    minColumnWidth: 180,
    gap:16,
    responsive: true
  })

  const handleAlbumClick = async (album: Album) => {
    setSelectedAlbum(album);
    setCurrentSong(null);
    setShowLyrics(false);
  };

  const handleCloseAlbum = () => {
    setSelectedAlbum(null);
  };

  const handleSongPlay = (song: AlbumItem) => {
    setCurrentSong(song);
    // 这里可以添加实际的播放逻辑
    console.log('播放歌曲:', song.name);
  };

  const handleShowLyrics = (song: AlbumItem) => {
    setCurrentSong(song);
    setShowLyrics(true);
  };

  const handleCloseLyrics = () => {
    setShowLyrics(false);
  };

  const handleImageLoad = useCallback((
    event: React.SyntheticEvent<HTMLImageElement>,
    itemId: string | number
  ) => {
  const img = event.currentTarget;
  
  const naturalHeight = img.naturalHeight;
  const naturalWidth = img.naturalWidth;

  const displayHeight = (naturalHeight / naturalWidth) * columnWidth;
  const contentHeight = 80; // 标题区域高度
  const totalHeight = displayHeight + contentHeight;

    // 注册实际高度
    registerItemHeight(itemId, totalHeight);
  }, [registerItemHeight, columnWidth]);

  const renderCard = useCallback((item: any) => {
    return (
      <div
      key={item.id}
      onClick={() => handleAlbumClick(item)}
      className="group bg-gray-800 rounded-lg shadow-lg cursor-pointer overflow-hidden relative"
    >
      {/* 图片容器 - 需要固定宽高比 */}
      <div className="relative w-full overflow-hidden">
        <Image
          src={item.cover}
          alt={item.name}
          width={columnWidth} // 使用计算出的列宽
          height={Math.floor(columnWidth * 1.5)}
          onLoad={(e) => handleImageLoad(e, item.id)}
          className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
        />
      </div>
        {/* 悬停遮罩 */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
      <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-bold text-lg text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          {item.name}
        </h3>
      </div>
    </div>
    </div>
    )
  }, [columnWidth, handleImageLoad])

  return (
    <div className="h-full overflow-y-scroll flex flex-col justify-between container mx-auto px-4 py-8">
      <h2 className="mb-6 text-2xl text-center">专辑&&单曲</h2>
      <div ref={containerRef} className="flex-1 gap-8 mb-8 flex justify-center">
        {columnData?.length ? columnData?.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex flex-col gap-4"
            style={{
              width: `${columnWidth}px`,
            }}
          >
             {column.map(renderCard)}
          </div>
        )) : ''}
      </div>

      {/* 分页 */}
      {isClient && (<div className="text-center p-4" ref={triggerRef}>
        {loading && (
          <div className="loading-indicator">
            加载中...
          </div>
        )}
        {error && (
          <div className="error-message">
            {error}
            <button onClick={handleLoadMore}>重试</button>
          </div>
        )}
        {!hasMore && albumsData.length > 0 && (
          <div className="no-more">没有更多数据了</div>
        )}
        
        {!hasMore && albumsData.length === 0 && (
          <div className="empty-state">暂无数据</div>
        )}
      </div>)}
      
      {/* 详情 */}
      {selectedAlbum && (
        <AlbumBox
          album={selectedAlbum}
          onClose={handleCloseAlbum}
          onSongPlay={handleSongPlay}
          onShowLyrics={handleShowLyrics}
          currentSong={currentSong}
        />
      )}

      {showLyrics && currentSong && selectedAlbum && (
        <LyricsModal
          song={currentSong}
          onClose={handleCloseLyrics}
          onPlay={handleSongPlay}
        />
      )}
      {/* 自定义动画样式 */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
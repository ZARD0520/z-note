'use client'

import { AlbumGridProps, AlbumType } from '@/type/wezard/albums'
import { Album } from '@/type/wezard/albums'
import VideoDetail from './videoDetail'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { getAlbumList } from '@/api'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import useWaterfallFlow from '@/hooks/useWaterfallFlow'

export default function VideoBox({ dict, initialData, initialPagination }: AlbumGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<Album | null>(null)
  const [currentPagination, setCurrentPagination] = useState(initialPagination)
  const [videosData, setVideosData] = useState<Album[]>(initialData)
  const [hasMore, setHasMore] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLoadMore = useCallback(async () => {
    try {
      const res = await getAlbumList({
        type: AlbumType.VIDEO,
        current: currentPagination.current + 1,
        limit: currentPagination.limit,
      })

      if (res.data?.length) {
        setVideosData((prev) => [
          ...prev,
          ...(res?.data?.map((item) => ({ ...item, items: [] })) || []),
        ])
      }
      const hasMore = res?.pagination?.current < res?.pagination?.pages

      setHasMore(hasMore)
      if (hasMore) {
        setCurrentPagination((prev) => ({ ...prev, current: prev.current + 1 }))
      }
    } catch (error) {
      console.error('获取视频列表失败:', error)
      throw error
    }
  }, [currentPagination])

  const { loading, error, triggerRef, reset } = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    hasMore,
    threshold: 50,
  })

  const handleRetry = useCallback(() => {
    reset()
  }, [reset])

  const { columnData, containerRef, columnWidth, registerItemHeight } = useWaterfallFlow(
    videosData,
    {
      minColumnWidth: 280,
      gap: 16,
      responsive: true,
    }
  )

  const handleVideoClick = async (video: Album) => {
    setSelectedVideo(video)
  }

  const handleCloseVideo = () => {
    setSelectedVideo(null)
  }

  const handleImageLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>, itemId: string | number) => {
      const img = event.currentTarget

      const naturalHeight = img.naturalHeight
      const naturalWidth = img.naturalWidth

      // 视频卡片通常是16:9的比例
      const displayHeight = (naturalHeight / naturalWidth) * columnWidth || (columnWidth * 9) / 16
      const contentHeight = 80 // 标题和播放按钮区域高度
      const totalHeight = displayHeight + contentHeight

      // 注册实际高度
      registerItemHeight(itemId, totalHeight)
    },
    [registerItemHeight, columnWidth]
  )

  const renderCard = useCallback(
    (item: any) => {
      return (
        <div
          key={item.id}
          onClick={() => handleVideoClick(item)}
          className="group bg-gray-800 rounded-lg shadow-lg cursor-pointer overflow-hidden relative"
        >
          {/* 视频封面容器 */}
          <div className="relative w-full overflow-hidden">
            <Image
              src={item.cover}
              alt={item.name}
              width={columnWidth}
              height={Math.floor((columnWidth * 9) / 16)}
              onLoad={(e) => handleImageLoad(e, item.id)}
              className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
            />
            {/* 播放按钮遮罩 */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
              <div className="text-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl text-gray-900 ml-1">▶</span>
                </div>
                <p className="text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  点击播放
                </p>
              </div>
            </div>
          </div>
          {/* 底部信息 */}
          <div className="p-3 bg-gray-800">
            <h3 className="text-sm font-medium text-white truncate mb-1">{item.name}</h3>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{item.mediaCount} 个视频</span>
              {item.description && <span className="truncate max-w-[60%]">{item.description}</span>}
            </div>
          </div>
        </div>
      )
    },
    [columnWidth, handleImageLoad]
  )

  return (
    <div className="h-full overflow-y-scroll flex flex-col justify-between container mx-auto px-4 py-8">
      <h2 className="mb-6 text-2xl text-center">视频集</h2>
      <div ref={containerRef} className="flex-1 gap-8 mb-8 flex justify-center">
        {columnData?.length
          ? columnData?.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className="flex flex-col gap-4"
                style={{
                  width: `${columnWidth}px`,
                }}
              >
                {column.map(renderCard)}
              </div>
            ))
          : ''}
      </div>

      {/* 分页 */}
      {isClient && (
        <div className="text-center p-4" ref={triggerRef}>
          {loading && <div className="loading-indicator">加载中...</div>}
          {error && (
            <div className="error-message">
              {error}
              <button className="ml-2" onClick={handleRetry}>
                点击重试
              </button>
            </div>
          )}
          {!hasMore && videosData.length > 0 && <div className="no-more">没有更多数据了</div>}

          {!hasMore && videosData.length === 0 && <div className="empty-state">暂无数据</div>}
        </div>
      )}

      {/* 详情 */}
      {selectedVideo && <VideoDetail video={selectedVideo} onClose={handleCloseVideo} />}
    </div>
  )
}

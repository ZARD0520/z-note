'use client'

import { AlbumGridProps, AlbumType } from "@/type/wezard/albums";
import { Album, AlbumItem } from "@/type/wezard/albums"
import AlbumBox from "./albumBox"
import LyricsModal from "./lyticsModal"
import { useCallback, useEffect, useState } from "react"
import Image from "next/image";
import { Pagination } from "antd";
import { useWindowSize } from "@/hooks/useWindowSize";
import { getAlbumList } from "@/api";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

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

  const handlePageChange = async (page: number, newPageSize: number) => {
    let currentPage = newPageSize !== currentPagination.limit ? 1 : page;

    try {
      const res = await getAlbumList({ type: AlbumType.MUSIC, current: currentPage, limit: currentPagination.limit })
      setAlbumsData(res?.data?.map((item)=>({ ...item, items:[] })) || [])
      setCurrentPagination({...currentPagination, current: currentPage })
    } catch (error) {
      console.error('获取专辑列表失败:', error);
    }
  }

  return (
    <div className="h-full overflow-y-scroll flex flex-col justify-between container mx-auto px-4 py-8">
      <h2 className="mb-6 text-2xl text-center">专辑&&单曲</h2>
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mb-8">
        {albumsData?.length ? albumsData?.map((album) => (
          <div
            key={album.id}
            className={`
            bg-gray-800 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 
            hover:scale-105 hover:shadow-2xl overflow-hidden aspect-square
          `}
            onClick={() => handleAlbumClick(album)}
          >
            <div className="relative w-full h-full">
              <Image
                fill
                src={album.cover}
                alt={album.name}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-bold text-lg">{album.name}</h3>
                </div>
              </div>
            </div>
          </div>
        )) : ''}
      </div>

      {/* 分页-PC */}
      {
        isClient && !isMobile && (<div className="p-4 flex items-center justify-center">
        <Pagination className="dark-mode" onChange={handlePageChange} current={currentPagination.current} pageSize={currentPagination.limit} total={currentPagination.total} />
        </div>)
      }

      {/* 分页-Mobile */}
      {
        isClient && isMobile && (
          <div className="text-center p-4" ref={triggerRef}>
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
          </div>
        )
      }
      
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
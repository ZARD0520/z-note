'use client'

import { AlbumGridProps } from "@/type/wezard/albums";
import { Album, Song } from "@/type/wezard/albums"
import AlbumBox from "./albumBox"
import LyricsModal from "./lyticsModal"
import { useState } from "react"
import Image from "next/image";

export default function AlbumGrid({ dict, initialData, initialPage }: any) {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [showLyrics, setShowLyrics] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [albumsData, setAlbumsData] = useState<Album[]>(initialData);

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
    setCurrentSong(null);
    setShowLyrics(false);
  };

  const handleCloseAlbum = () => {
    setSelectedAlbum(null);
  };

  const handleSongPlay = (song: Song) => {
    setCurrentSong(song);
    // 这里可以添加实际的播放逻辑
    console.log('播放歌曲:', song.name);
  };

  const handleShowLyrics = (song: Song) => {
    setCurrentSong(song);
    setShowLyrics(true);
  };

  const handleCloseLyrics = () => {
    setShowLyrics(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-6 text-2xl text-center">专辑&&单曲</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mb-8">
        {albumsData?.length && albumsData?.map((album) => (
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
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-bold text-lg">{album.name}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 分页 */}
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
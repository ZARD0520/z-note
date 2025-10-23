'use client'

import { AlbumGridProps } from "@/type/wezard/albums";
import { Album, Song } from "@/type/wezard/albums"
import AlbumBox from "./albumBox"
import LyricsModal from "./lyticsModal"
import { useState } from "react"

const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'The Dreamers',
    cover: '/api/placeholder/300/300',
    type: 'album',
    releaseDate: '2024',
    songs: [
      {
        id: '1-1',
        title: 'Midnight Sky',
        duration: '3:45',
        lyrics: '在午夜的天空下...\n星光闪烁...\n我们相遇在此时\n心跳的声音如此清晰'
      },
      {
        id: '1-2',
        title: 'Dream Walker',
        duration: '4:20',
        lyrics: '漫步在梦境中...\n寻找真实...\n穿越时空的界限\n找到属于我们的答案'
      }
    ]
  },
  {
    id: '2',
    title: 'Summer Breeze',
    artist: 'Ocean Blue',
    cover: '/api/placeholder/300/150',
    type: 'single',
    releaseDate: '2024',
    songs: [
      {
        id: '2-1',
        title: 'Summer Breeze',
        duration: '3:15',
        lyrics: '夏日的微风...\n轻轻吹过...\n带来海的味道\n和我们的回忆'
      }
    ]
  },
  {
    id: '3',
    title: 'Electric Love',
    artist: 'Neon Lights',
    cover: '/api/placeholder/300/300',
    type: 'album',
    releaseDate: '2024',
    songs: [
      {
        id: '3-1',
        title: 'Electric Love',
        duration: '3:30',
        lyrics: '电流穿过心脏...\n爱的火花...\n在霓虹中闪烁\n永不停息'
      },
      {
        id: '3-2',
        title: 'Neon Nights',
        duration: '4:05',
        lyrics: '霓虹灯下...\n夜晚刚刚开始...\n城市的脉搏\n随着音乐跳动'
      }
    ]
  }
]

export default function AlbumGrid({ dict }: { dict: any }) {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [showLyrics, setShowLyrics] = useState(false);

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
    console.log('播放歌曲:', song.title);
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
      <div className="flex flex-row flex-wrap gap-6 mb-8">
        {mockAlbums.map((album) => (
          <div
            key={album.id}
            className={`
            bg-gray-800 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 
            hover:scale-105 hover:shadow-2xl overflow-hidden h-60 
            ${album.type === 'album' ? 'w-60' : 'w-30'}
          `}
            onClick={() => handleAlbumClick(album)}
          >
            <div className="relative w-full h-full">
              <img
                src={album.cover}
                alt={album.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-bold text-lg">{album.title}</h3>
                  <p className="text-sm text-gray-300">{album.artist}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
          artist={selectedAlbum.artist}
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
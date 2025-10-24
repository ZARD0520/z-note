'use client'

import { AlbumGridProps } from "@/type/wezard/albums";
import { Album, Song } from "@/type/wezard/albums"
import AlbumBox from "./albumBox"
import LyricsModal from "./lyticsModal"
import { useState } from "react"
import Image from "next/image";

const mockAlbums: Album[] = [
  {
    id: '1',
    name: 'Midnight Dreams',
    cover: '/media/images/1.jpg',
    type: 'album',
    releaseDate: '2024',
    songs: [
      {
        id: '1-1',
        name: 'Midnight Sky',
        duration: '3:45',
        url: '',
        lyrics: '在午夜的天空下...\n星光闪烁...\n我们相遇在此时\n心跳的声音如此清晰'
      },
      {
        id: '1-2',
        name: 'Dream Walker',
        duration: '4:20',
        url: '',
        lyrics: '漫步在梦境中...\n寻找真实...\n穿越时空的界限\n找到属于我们的答案'
      }
    ]
  },
  {
    id: '3',
    name: 'Electric Love',
    cover: '/media/images/3.jpg',
    type: 'album',
    releaseDate: '2024',
    songs: [
      {
        id: '3-1',
        url: '',
        name: 'Electric Love',
        duration: '3:30',
        lyrics: '电流穿过心脏...\n爱的火花...\n在霓虹中闪烁\n永不停息'
      },
      {
        id: '3-2',
        url: '',
        name: 'Neon Nights',
        duration: '4:05',
        lyrics: '霓虹灯下...\n夜晚刚刚开始...\n城市的脉搏\n随着音乐跳动'
      }
    ]
  },
  {
    id: '3',
    name: 'Electric Love',
    cover: '/media/images/3.jpg',
    type: 'album',
    releaseDate: '2024',
    songs: [
      {
        id: '3-1',
        url: '',
        name: 'Electric Love',
        duration: '3:30',
        lyrics: '电流穿过心脏...\n爱的火花...\n在霓虹中闪烁\n永不停息'
      },
      {
        id: '3-2',
        url: '',
        name: 'Neon Nights',
        duration: '4:05',
        lyrics: '霓虹灯下...\n夜晚刚刚开始...\n城市的脉搏\n随着音乐跳动'
      }
    ]
  },
  {
    id: '3',
    name: 'Electric Love',
    cover: '/media/images/3.jpg',
    type: 'album',
    releaseDate: '2024',
    songs: [
      {
        id: '3-1',
        url: '',
        name: 'Electric Love',
        duration: '3:30',
        lyrics: '电流穿过心脏...\n爱的火花...\n在霓虹中闪烁\n永不停息'
      },
      {
        id: '3-2',
        url: '',
        name: 'Neon Nights',
        duration: '4:05',
        lyrics: '霓虹灯下...\n夜晚刚刚开始...\n城市的脉搏\n随着音乐跳动'
      }
    ]
  },
  {
    id: '3',
    name: 'Electric Love',
    cover: '/media/images/3.jpg',
    type: 'album',
    releaseDate: '2024',
    songs: [
      {
        id: '3-1',
        url: '',
        name: 'Electric Love',
        duration: '3:30',
        lyrics: '电流穿过心脏...\n爱的火花...\n在霓虹中闪烁\n永不停息'
      },
      {
        id: '3-2',
        url: '',
        name: 'Neon Nights',
        duration: '4:05',
        lyrics: '霓虹灯下...\n夜晚刚刚开始...\n城市的脉搏\n随着音乐跳动'
      }
    ]
  },
  {
    id: '3',
    name: 'Electric Love',
    cover: '/media/images/3.jpg',
    type: 'album',
    releaseDate: '2024',
    songs: [
      {
        id: '3-1',
        url: '',
        name: 'Electric Love',
        duration: '3:30',
        lyrics: '电流穿过心脏...\n爱的火花...\n在霓虹中闪烁\n永不停息'
      },
      {
        id: '3-2',
        url: '',
        name: 'Neon Nights',
        duration: '4:05',
        lyrics: '霓虹灯下...\n夜晚刚刚开始...\n城市的脉搏\n随着音乐跳动'
      }
    ]
  },
  {
    id: '3',
    name: 'Electric Love',
    cover: '/media/images/3.jpg',
    type: 'album',
    releaseDate: '2024',
    songs: [
      {
        id: '3-1',
        url: '',
        name: 'Electric Love',
        duration: '3:30',
        lyrics: '电流穿过心脏...\n爱的火花...\n在霓虹中闪烁\n永不停息'
      },
      {
        id: '3-2',
        url: '',
        name: 'Neon Nights',
        duration: '4:05',
        lyrics: '霓虹灯下...\n夜晚刚刚开始...\n城市的脉搏\n随着音乐跳动'
      }
    ]
  },
  {
    id: '3',
    name: 'Electric Love',
    cover: '/media/images/3.jpg',
    type: 'album',
    releaseDate: '2024',
    songs: [
      {
        id: '3-1',
        url: '',
        name: 'Electric Love',
        duration: '3:30',
        lyrics: '电流穿过心脏...\n爱的火花...\n在霓虹中闪烁\n永不停息'
      },
      {
        id: '3-2',
        url: '',
        name: 'Neon Nights',
        duration: '4:05',
        lyrics: '霓虹灯下...\n夜晚刚刚开始...\n城市的脉搏\n随着音乐跳动'
      }
    ]
  },
  {
    id: '3',
    name: 'Electric Love',
    cover: '/media/images/3.jpg',
    type: 'album',
    releaseDate: '2024',
    songs: [
      {
        id: '3-1',
        url: '',
        name: 'Electric Love',
        duration: '3:30',
        lyrics: '电流穿过心脏...\n爱的火花...\n在霓虹中闪烁\n永不停息'
      },
      {
        id: '3-2',
        url: '',
        name: 'Neon Nights',
        duration: '4:05',
        lyrics: '霓虹灯下...\n夜晚刚刚开始...\n城市的脉搏\n随着音乐跳动'
      }
    ]
  },
  {
    id: '3',
    name: 'Electric Love',
    cover: '/media/images/3.jpg',
    type: 'album',
    releaseDate: '2024',
    songs: [
      {
        id: '3-1',
        url: '',
        name: 'Electric Love',
        duration: '3:30',
        lyrics: '电流穿过心脏...\n爱的火花...\n在霓虹中闪烁\n永不停息'
      },
      {
        id: '3-2',
        url: '',
        name: 'Neon Nights',
        duration: '4:05',
        lyrics: '霓虹灯下...\n夜晚刚刚开始...\n城市的脉搏\n随着音乐跳动'
      }
    ]
  },
  {
    id: '3',
    name: 'Electric Love',
    cover: '/media/images/3.jpg',
    type: 'album',
    releaseDate: '2024',
    songs: [
      {
        id: '3-1',
        url: '',
        name: 'Electric Love',
        duration: '3:30',
        lyrics: '电流穿过心脏...\n爱的火花...\n在霓虹中闪烁\n永不停息'
      },
      {
        id: '3-2',
        url: '',
        name: 'Neon Nights',
        duration: '4:05',
        lyrics: '霓虹灯下...\n夜晚刚刚开始...\n城市的脉搏\n随着音乐跳动'
      }
    ]
  },
  {
    id: '3',
    name: 'Electric Love',
    cover: '/media/images/3.jpg',
    type: 'album',
    releaseDate: '2024',
    songs: [
      {
        id: '3-1',
        url: '',
        name: 'Electric Love',
        duration: '3:30',
        lyrics: '电流穿过心脏...\n爱的火花...\n在霓虹中闪烁\n永不停息'
      },
      {
        id: '3-2',
        url: '',
        name: 'Neon Nights',
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
        {mockAlbums.map((album) => (
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
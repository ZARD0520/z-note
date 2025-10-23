'use client'

import { AlbumBoxProps, Song } from "@/type/wezard/albums";
import { useState } from "react";

export default function AlbumBox({ 
  album, 
  onClose, 
  onSongPlay, 
  onShowLyrics, 
  currentSong 
}: AlbumBoxProps) {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const handleSongClick = (song: Song) => {
    setSelectedSong(song);
  };

  const handlePlaySong = (song: Song, e: React.MouseEvent) => {
    e.stopPropagation();
    onSongPlay(song);
  };

  const handleShowLyrics = (song: Song, e: React.MouseEvent) => {
    e.stopPropagation();
    onShowLyrics(song);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
      <div className=" overflow-y-auto bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* CD 展示区域 */}
          <div className="lg:w-2/5 p-4 flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-slate-800">
            <div className="relative">
              {/* CD 圆盘 */}
              <div className="w-60 h-60 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 border-8 border-gray-700 flex items-center justify-center shadow-2xl animate-spin-slow">
                <div className="w-16 h-16 rounded-full bg-gray-900 border-4 border-gray-700"></div>
              </div>
              
              {/* 专辑封面 */}
              <img
                src={album.cover}
                alt={album.title}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-bold">{album.title}</h2>
              <p className="text-sm text-gray-400 mt-1">{album.releaseDate}</p>
            </div>
          </div>

          {/* 歌曲列表区域 */}
          <div className="lg:w-3/5 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">歌曲列表</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {album.songs.map((song, index) => (
                <div
                  key={song.id}
                  className={`
                    flex items-center justify-between p-4 rounded-lg mb-2 cursor-pointer transition-all duration-200
                    ${currentSong?.id === song.id 
                      ? 'bg-purple-600' 
                      : 'bg-gray-800 hover:bg-gray-700'
                    }
                  `}
                  onClick={() => handleSongClick(song)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 text-center text-gray-400">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{song.title}</div>
                      <div className="text-sm text-gray-400">
                        {album.artist} • {song.duration}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => handlePlaySong(song, e)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      播放
                    </button>
                    <button
                      onClick={(e) => handleShowLyrics(song, e)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      歌词
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
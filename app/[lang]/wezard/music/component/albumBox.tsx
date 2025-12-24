'use client'

import { AlbumBoxProps, AlbumItem, AlbumType } from '@/type/wezard/albums'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getAlbumDetail } from '@/api'
import { formatSeconds, timestampToUTCString } from '@/utils/date'

export default function AlbumBox({
  album,
  onSetPlayList,
  onClose,
  onSongPlay,
  onShowLyrics,
  currentSong,
}: AlbumBoxProps) {
  const [songs, setSongs] = useState<AlbumItem[]>([])
  useEffect(() => {
    getAlbumDetail({ type: AlbumType.MUSIC, id: album.id })
      .then((res) => {
        setSongs(res)
        onSetPlayList(res)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [album.id, onSetPlayList])

  const handlePlaySong = (song: AlbumItem, e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentSong?.id !== song.id) {
      onSongPlay(song)
    }
  }

  const handleSetPlayList = () => {
    getAlbumDetail({ type: AlbumType.MUSIC, id: album.id })
      .then((res) => {
        if (res.length) {
          setSongs(res)
          onSetPlayList(res)
          if (currentSong?.id !== res[0].id) {
            onSongPlay(res[0])
          }
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className=" overflow-y-auto bg-gray-900 w-full h-full overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* CD 展示区域 */}
          <div className="md:w-1/2 md:min-h-screen p-4 pt-12 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900">
            <div className="relative">
              {/* CD 圆盘 */}
              <div className="w-60 h-60 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 border-8 border-gray-700 flex items-center justify-center shadow-2xl animate-spin-slow">
                <div className="w-16 h-16 rounded-full bg-gray-900 border-4 border-gray-700"></div>
              </div>

              {/* 专辑封面 */}
              <Image
                fill
                src={album.cover}
                alt={album.name}
                className="absolute top-1/2 left-1/2 transform w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold">{album.name}</h2>
              <p className="text-sm text-gray-400 mt-4">
                {timestampToUTCString(album.releaseDate, 'date')}
              </p>
            </div>
          </div>

          {/* 歌曲列表区域 */}
          <div className="md:w-1/2 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="cursor-pointer flex items-center" onClick={handleSetPlayList}>
                <i className="iconfont icon-bofang mr-4 !text-2xl"></i>
                <h3 className="text-xl font-bold">全部播放{`(${songs.length})`}</h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {songs?.map((song, index) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-4 rounded-lg mb-2 cursor-pointer transition-all duration-200 bg-gray-800 hover:bg-gray-700"
                  onClick={(e) => handlePlaySong(song, e)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 text-center text-gray-400">{index + 1}</div>
                    {currentSong?.id === song.id ? (
                      <div className="flex items-end space-x-1 h-5">
                        <div
                          className="w-1 bg-white waveBar"
                          style={{ animationDelay: '0s' }}
                        ></div>
                        <div
                          className="w-1 bg-white waveBar"
                          style={{ animationDelay: '0.1s' }}
                        ></div>
                        <div
                          className="w-1 bg-white waveBar"
                          style={{ animationDelay: '0.3s' }}
                        ></div>
                      </div>
                    ) : (
                      ''
                    )}
                    <div>
                      <div className="font-medium">{song.name}</div>
                    </div>
                  </div>

                  <div
                    onClick={(e) => handlePlaySong(song, e)}
                    className="flex items-center space-x-2"
                  >
                    <div className="text-sm text-gray-400">{formatSeconds(song.duration)}</div>
                    {/* <button
                      onClick={(e) => handleShowLyrics(song, e)}
                      className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      歌词
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { LyricsModalProps } from "@/type/wezard/albums";

export default function LyricsModal({ song, onClose, onPlay }: LyricsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold">{song.name}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-2xl"
            >
              ✕
            </button>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 max-h-96 overflow-y-auto">
            <pre className="text-lg leading-8 text-center whitespace-pre-wrap">
              {song.lyrics}
            </pre>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => onPlay(song)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              播放歌曲
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
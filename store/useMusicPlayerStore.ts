import { STORAGE_KEYS } from '@/constants/store'
import { MusicPlayerActions, MusicPlayerState, PlayMode } from '@/type/store/musicPlayer'
import { AlbumItem } from '@/type/wezard/albums'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialState: Omit<MusicPlayerState, 'audioElement'> = {
  currentSong: null,
  playlist: [],
  currentIndex: -1,
  isPlaying: false,
  progress: 0,
  volume: 1,
  isExpanded: false,
  playMode: 'sequential',
}

export const useMusicPlayerStore = create<MusicPlayerState & MusicPlayerActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      audioElement: null,
      setPlaylist: (songs: AlbumItem[]) => {
        set({
          playlist: songs,
        })
      },
      setCurrentPlay: (song: AlbumItem) => {
        const { play } = get()
        set({
          currentSong: song,
          currentIndex: 0,
          progress: 0,
          isPlaying: true,
        })
        play()
      },
      play: () => {
        const { audioElement, currentSong } = get()
        if (audioElement && currentSong) {
          audioElement.play().catch(console.error)
          set({ isPlaying: true })
        }
      },
      pause: () => {
        const { audioElement } = get()
        if (audioElement) {
          audioElement.pause()
          set({ isPlaying: false })
        }
      },

      togglePlay: () => {
        const { isPlaying, play, pause } = get()
        if (isPlaying) {
          pause()
        } else {
          play()
        }
      },

      next: () => {
        const { playlist, currentIndex, audioElement, playMode } = get()
        if (playlist.length === 0) return

        let nextIndex: number
        if (playMode === 'single') {
          // 单曲循环：保持当前索引
          nextIndex = currentIndex
        } else if (playMode === 'random') {
          // 随机播放：随机选择一个不同的索引
          if (playlist.length === 1) {
            nextIndex = 0
          } else {
            let randomIndex
            do {
              randomIndex = Math.floor(Math.random() * playlist.length)
            } while (randomIndex === currentIndex && playlist.length > 1)
            nextIndex = randomIndex
          }
        } else {
          // 顺序播放：下一首，循环到第一首
          nextIndex = (currentIndex + 1) % playlist.length
        }

        set({
          currentIndex: nextIndex,
          currentSong: playlist[nextIndex],
          progress: 0,
          isPlaying: true,
        })

        if (audioElement) {
          setTimeout(() => {
            audioElement.currentTime = 0
            audioElement.play().catch(console.error)
          }, 0)
        }
      },

      prev: () => {
        const { playlist, currentIndex, audioElement, playMode } = get()
        if (playlist.length === 0) return

        let prevIndex: number
        if (playMode === 'single') {
          // 单曲循环：保持当前索引
          prevIndex = currentIndex
        } else if (playMode === 'random') {
          // 随机播放：随机选择一个不同的索引
          if (playlist.length === 1) {
            prevIndex = 0
          } else {
            let randomIndex
            do {
              randomIndex = Math.floor(Math.random() * playlist.length)
            } while (randomIndex === currentIndex && playlist.length > 1)
            prevIndex = randomIndex
          }
        } else {
          // 顺序播放：上一首，循环到最后一首
          prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
        }

        set({
          currentIndex: prevIndex,
          currentSong: playlist[prevIndex],
          progress: 0,
          isPlaying: true,
        })

        if (audioElement) {
          setTimeout(() => {
            audioElement.currentTime = 0
            audioElement.play().catch(console.error)
          }, 0)
        }
      },

      toggleExpand: () => {
        set((state) => ({
          isExpanded: !state.isExpanded,
        }))
      },

      setProgress: (progress: number) => {
        set({ progress })
      },

      setVolume: (volume: number) => {
        const { audioElement } = get()
        if (audioElement) {
          audioElement.volume = volume
        }
        set({ volume })
      },

      setAudioElement: (audioElementSource: HTMLAudioElement) => {
        const { audioElement } = get()
        if (!audioElement) {
          set({ audioElement: audioElementSource })
        }
      },

      seek: (time: number) => {
        const { audioElement, currentSong } = get()
        if (audioElement && currentSong) {
          audioElement.currentTime = time
          set({ progress: (time / audioElement.duration) * 100 })
        }
      },

      clearPlayer: () => {
        const { audioElement } = get()
        if (audioElement) {
          audioElement.pause()
          audioElement.src = ''
        }
        set(initialState)
      },

      exitPlayer: () => {
        const { clearPlayer } = get()
        clearPlayer()
        set({ audioElement: null })
      },

      togglePlayMode: () => {
        const { playMode } = get()
        const modes: PlayMode[] = ['sequential', 'random', 'single']
        const currentModeIndex = modes.indexOf(playMode)
        const nextModeIndex = (currentModeIndex + 1) % modes.length
        set({ playMode: modes[nextModeIndex] })
      },

      setPlayMode: (mode: PlayMode) => {
        set({ playMode: mode })
      },
    }),
    {
      name: STORAGE_KEYS.MUSIC_PLAYER_STORE,
      partialize: (state) => ({
        volume: state.volume,
        isExpanded: state.isExpanded,
        playMode: state.playMode,
      }),
    }
  )
)

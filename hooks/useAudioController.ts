import { useMusicPlayerStore } from "@/store/useMusicPlayerStore";
import { useEffect, useRef } from "react";

export function useAudioController() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const {
    currentSong,
    isPlaying,
    volume,
    setAudioElement,
    setProgress,
    next,
  } = useMusicPlayerStore();

  useEffect(()=> {
    if (audioRef.current) {
      setAudioElement(audioRef.current);
    }
  },[setAudioElement])

  // 播放状态
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  // 音量控制
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  // 切歌
  useEffect(() => {
    if (currentSong) {
      setProgress(0);
    }
  }, [currentSong, setProgress]);

  // 进度更新和播放结束处理
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        const newProgress = (audio.currentTime / audio.duration) * 100;
        setProgress(newProgress);
      }
    };

    const handleEnded = () => {
      next();
    };

    const handleLoadedMetadata = () => {
      setProgress(0);
    };

    const handleError = (e: Event) => {
      console.error('音频加载失败:', e);
      // 可以在这里添加错误处理逻辑，比如切换到下一首
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
    };
  }, [setProgress, next]);

  // 清理播放器
  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  return {
    audioRef,
    currentSong,
  };
}
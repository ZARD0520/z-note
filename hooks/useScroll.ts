import { UseScrollType } from "@/type/common/hooks";
import { throttle } from "@/utils/utils";
import { useCallback, useEffect, useRef, useState } from "react";

export function usePageScroll({
  totalPages,
  initialPage = 0,
  scrollThreshold = 20,
  swipeThreshold = 20,
  enableKeyboard = true,
  enableWheel = true,
  enableSwipe = true,
  throttleDelay = 800
}:UseScrollType.useScrollProps):UseScrollType.useScrollReturn {
  const [[currentPage, direction], setPageState] = useState<[number, number]>([initialPage, 0])
  const touchStartRef = useRef<UseScrollType.touchPosition | null>(null)
  const lastWheelTimeRef = useRef<number>(0)
  const isScrollingRef = useRef<boolean>(false)

  const goToNextPage = useCallback((): void => {
    if (currentPage < totalPages - 1) {
      setPageState([currentPage + 1, 1])
    }
  }, [currentPage, totalPages])

  const goToPrevPage = useCallback((): void => {
    if (currentPage > 0) {
      setPageState([currentPage - 1, -1])
    }
  }, [currentPage])

  const goToPage = useCallback((page: number): void => {
    if (page >= 0 && page < totalPages) {
      const newDirection = page > currentPage ? 1 : -1
      setPageState([page, newDirection])
    }
  }, [currentPage, totalPages])

  const handleWheel = useCallback((event: WheelEvent): void => {
    if (!enableWheel || isScrollingRef.current) return

    const now = Date.now()
    if (now - lastWheelTimeRef.current < throttleDelay) return

    const { deltaY } = event
    
    if (Math.abs(deltaY) > scrollThreshold) {
      isScrollingRef.current = true
      lastWheelTimeRef.current = now

      if (deltaY > 0) {
        goToNextPage()
      } else {
        goToPrevPage()
      }

      // 重置滚动锁定状态
      setTimeout(() => {
        isScrollingRef.current = false
      }, throttleDelay)
    }
  }, [enableWheel, scrollThreshold, throttleDelay, goToNextPage, goToPrevPage])
  
  const throttledWheelHandler = throttle(handleWheel, throttleDelay)

  const handleTouchStart = useCallback((event: TouchEvent): void => {
    if (!enableSwipe) return
    
    touchStartRef.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
      time: Date.now()
    }
  }, [enableSwipe])

  const handleTouchEnd = useCallback((event: TouchEvent): void => {
    if (!enableSwipe || !touchStartRef.current) return

    const touchEnd = {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
      time: Date.now()
    }

    const diffX = touchStartRef.current.x - touchEnd.x
    const diffY = touchStartRef.current.y - touchEnd.y
    const timeDiff = touchEnd.time - touchStartRef.current.time

    // 只处理快速滑动（小于300ms）
    if (timeDiff < 300) {
      const isVerticalSwipe = Math.abs(diffY) > Math.abs(diffX)

      if (isVerticalSwipe && Math.abs(diffY) > swipeThreshold) {
        if (diffY > 0) {
          // 向上滑动 - 下一页
          goToNextPage()
        } else {
          // 向下滑动 - 上一页
          goToPrevPage()
        }
      } else if (!isVerticalSwipe && Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
          // 向左滑动 - 下一页
          goToNextPage()
        } else {
          // 向右滑动 - 上一页
          goToPrevPage()
        }
      }
    }

    touchStartRef.current = null
  }, [enableSwipe, swipeThreshold, goToNextPage, goToPrevPage])

  useEffect(()=>{
    const passiveOptions = { passive: false } as EventListenerOptions

    if (enableWheel) {
      window.addEventListener('wheel', throttledWheelHandler as EventListener, passiveOptions)
    }

    if (enableSwipe) {
      window.addEventListener('touchstart', handleTouchStart, passiveOptions)
      window.addEventListener('touchend', handleTouchEnd, passiveOptions)
    }

    return () => {
      if (enableWheel) {
        window.removeEventListener('wheel', throttledWheelHandler as EventListener)
      }
      if (enableSwipe) {
        window.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('touchend', handleTouchEnd)
      }
    }
  },[enableWheel, enableSwipe, enableKeyboard, throttledWheelHandler, handleTouchStart, handleTouchEnd])

  const progress = totalPages > 1 ? (currentPage / (totalPages - 1)) * 100 : 0

  return {
    currentPage,
    direction,
    goToNextPage,
    goToPrevPage,
    goToPage,
    isFirstPage: currentPage === 0,
    isLastPage: currentPage === totalPages - 1,
    progress
  }
}
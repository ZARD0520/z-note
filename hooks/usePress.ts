'use client'

import { usePressType } from "@/type/common/hooks"
import { useCallback, useRef } from "react"

const usePress = ({ onPress, options }: usePressType.usePressParams) => {
  const { duration = 3000, onStart, onEnd } = options
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null)

  const start = useCallback((event?: Event) => {
    event?.preventDefault()
    onStart?.()
    pressTimerRef.current = setTimeout(() => {
      onPress()
      pressTimerRef.current = null
    }, duration)
  }, [duration, onPress, onStart])

  const end = useCallback((event?: Event) => {
    event?.preventDefault()
    onEnd?.()

    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current)
      pressTimerRef.current = null
    }
  }, [onEnd])

  return {
    onMouseDown: start,
    onMouseUp: end,
    onMouseLeave: end,
    onTouchStart: start,
    onTouchEnd: end,
    onTouchCancel: end
  }
}

export default usePress
'use client'

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  TouchEventHandler,
  MouseEventHandler,
} from 'react'

interface DragState {
  x: number
  y: number
}

interface Draggable {
  position: DragState
  dragging: boolean
  draggingMobile: boolean
  handleMouseDown: MouseEventHandler<HTMLDivElement>
  handleTouchStart: TouchEventHandler<HTMLDivElement>
  handleTouchEnd: TouchEventHandler<HTMLDivElement>
  handleTouchMove: TouchEventHandler<HTMLDivElement>
}

const useDrag = (initialPosition: DragState = { x: 0, y: 0 }): Draggable => {
  const [position, setPosition] = useState<DragState>(initialPosition)
  const [dragging, setDragging] = useState<boolean>(false)
  const [draggingMobile, setDraggingMobile] = useState<boolean>(false)
  const offsetRef = useRef<DragState>({ x: 0, y: 0 })
  const elementRef = useRef<HTMLDivElement | null>(null)
  const rafIdRef = useRef<number | null>(null)

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault()
      setDragging(true)
      elementRef.current = e.currentTarget
      offsetRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      }
    },
    [position]
  )

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      setDraggingMobile(true)
      elementRef.current = e.currentTarget
      const touch = e.touches[0]
      offsetRef.current = {
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      }
    },
    [position]
  )

  const updatePosition = useCallback((px: number, py: number) => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
    }

    rafIdRef.current = requestAnimationFrame(() => {
      // 获取元素尺寸和窗口尺寸
      const element = elementRef.current
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      let finalX = px
      let finalY = py

      // 检查左边界
      if (finalX < 0) {
        finalX = 0
      }

      // 检查上边界
      if (finalY < 0) {
        finalY = 0
      }

      // 检查右边界和下边界（需要元素尺寸）
      if (element) {
        const rect = element.getBoundingClientRect()
        const elementWidth = rect.width
        const elementHeight = rect.height

        // 检查右边界
        if (finalX + elementWidth > windowWidth) {
          finalX = windowWidth - elementWidth
        }

        // 检查下边界
        if (finalY + elementHeight > windowHeight) {
          finalY = windowHeight - elementHeight
        }
      }

      setPosition({
        x: finalX,
        y: finalY,
      })
      rafIdRef.current = null
    })
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging) return

      e.preventDefault()
      const px = e.clientX - offsetRef.current.x
      const py = e.clientY - offsetRef.current.y
      updatePosition(px, py)
    },
    [dragging, updatePosition]
  )

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!draggingMobile) return

      e.preventDefault()
      const touch = e.touches[0]
      const px = touch.clientX - offsetRef.current.x
      const py = touch.clientY - offsetRef.current.y
      updatePosition(px, py)
    },
    [draggingMobile, updatePosition]
  )

  const handleMouseUp = useCallback((e: MouseEvent) => {
    e.preventDefault()
    setDragging(false)
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }, [])

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = useCallback(() => {
    setDraggingMobile(false)
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }, [])

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleMouseMove(e)
    }

    const handleGlobalMouseUp = (e: MouseEvent) => {
      handleMouseUp(e)
    }

    if (dragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove, { passive: false })
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [dragging, handleMouseMove, handleMouseUp])

  return {
    position,
    dragging,
    draggingMobile,
    handleMouseDown,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
  }
}

export default useDrag

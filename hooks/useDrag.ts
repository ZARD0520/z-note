'use client'

import { useState, useEffect, useCallback, TouchEventHandler, MouseEventHandler } from 'react'

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
  const [offset, setOffset] = useState<DragState>({ x: 0, y: 0 })

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault()
      setDragging(true)
      setOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    },
    [position]
  )

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      setDraggingMobile(true)
      const touch = e.touches[0]
      setOffset({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      })
    },
    [position]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (e.target == null) {
        return
      }
      e.preventDefault()
      if (dragging) {
        let px = e.clientX - offset.x
        let py = e.clientY - offset.y

        if (px < 0 || py < 0) {
          return
        }
        setPosition({
          x: px,
          y: py,
        })
      }
    },
    [dragging, offset]
  )

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (draggingMobile) {
        const touch = e.touches[0]
        let px = touch.clientX - offset.x
        let py = touch.clientY - offset.y
        if (px < 0 || py < 0) {
          return
        }
        setPosition({
          x: px,
          y: py,
        })
      }
    },
    [draggingMobile, offset]
  )

  const handleMouseUp = useCallback((e: MouseEvent) => {
    e.preventDefault()
    setDragging(false)
  }, [])

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = useCallback(() => {
    setDraggingMobile(false)
  }, [])

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleMouseMove(e)
    }

    const handleGlobalMouseUp = (e: MouseEvent) => {
      handleMouseUp(e)
    }

    if (dragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
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

'use client'

import React from 'react'
import useDrag from '@/hooks/useDrag'

const DraggableComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    position,
    dragging,
    draggingMobile,
    handleMouseDown,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
  } = useDrag()

  const style: React.CSSProperties = {
    position: 'absolute',
    userSelect: 'none', // 防止拖动时出现文本选择效果
    top: position.y,
    left: position.x,
    cursor: dragging || draggingMobile ? 'grabbing' : 'grab',
    zIndex: 9999,
  }

  return (
    <div
      style={style}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  )
}

export default DraggableComponent

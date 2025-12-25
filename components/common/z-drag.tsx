'use client'

import React from 'react'
import useDrag from '@/hooks/useDrag'
import { DraggableComponentProps } from '@/type/common/component'

const DraggableComponent: React.FC<DraggableComponentProps> = ({ children, initialPosition }) => {
  const {
    position,
    dragging,
    draggingMobile,
    handleMouseDown,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
  } = useDrag(initialPosition)

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

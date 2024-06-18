'use client'

import Image from 'next/image'
import { CaretDownOutlined } from '@ant-design/icons'
import { useCallback, useRef } from 'react'

interface chatContentProps {

}

const chatMessage = [
  {
    role: 'user',
    content: '你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁'
  },
  {
    role: 'assistant',
    content: '我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X'
  },
  {
    role: 'user',
    content: '你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁'
  },
  {
    role: 'assistant',
    content: '我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X'
  },
  {
    role: 'user',
    content: '你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁'
  },
  {
    role: 'assistant',
    content: '我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X'
  },
  {
    role: 'user',
    content: '你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁'
  },
  {
    role: 'assistant',
    content: '我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X'
  },
  {
    role: 'user',
    content: '你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁'
  },
  {
    role: 'assistant',
    content: '我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X'
  },
  {
    role: 'user',
    content: '你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁你是谁'
  },
  {
    role: 'assistant',
    content: '我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X'
  },
  {
    role: 'assistant',
    content: '我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X'
  },
  {
    role: 'assistant',
    content: '我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X我是X'
  },
]

const chatContent: React.FC<chatContentProps> = ({ }) => {

  const scrollRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollBottom = useCallback(() => {
    if (scrollRef.current && contentRef.current) {
      scrollRef.current.scrollTo({
        top: contentRef.current.offsetHeight,
        behavior: 'smooth'
      })
    }
  }, [])

  const chatDiv = (msg: any, mIndex: number) => {
    if (msg.role !== 'user') {
      return (
        (
          <div className='flex flex-row mb-4 w-full' key={mIndex}>
            <i className='mr-2 rounded-md iconfont icon-jiqiren'></i>
            <div className='bg-primary-border rounded-md p-2 text-left'>{msg.content}</div>
          </div>
        )
      )
    } else {
      return (
        <div className='flex flex-row mb-4 w-full justify-end' key={mIndex}>
          <div className='bg-primary rounded-md mr-2 p-2 text-left'>{msg.content}</div>
          <i className='rounded-md iconfont icon-gerentouxiang'></i>
        </div>
      )
    }
  }

  return (
    <>
      <div ref={scrollRef} className="max-h-full overflow-auto">
        <div ref={contentRef} className="w-full h-full">
          {chatMessage.map((msg, mIndex) => chatDiv(msg, mIndex))}
        </div>
      </div>
      <div className="mt-1 -mb-6 rounded-md pl-4 pr-4 border text-center cursor-pointer max-w-min m-auto">
        <CaretDownOutlined className="h-6" onClick={scrollBottom} />
      </div>
    </>
  )
}

export default chatContent
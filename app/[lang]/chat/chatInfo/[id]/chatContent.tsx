'use client'

import { CaretDownOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useRef, useState } from 'react'
import { chatContentProps } from '@/type/chat'
import ZMarkdown from '@/components/common/z-mark-down'

const ChatContent: React.FC<chatContentProps> = ({ messages, loading }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [showScroll, setShowScroll] = useState(false)

  const scrollBottom = useCallback(() => {
    if (scrollRef.current && contentRef.current) {
      scrollRef.current.scrollTo({
        top: contentRef.current.offsetHeight,
        behavior: 'smooth',
      })
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current && contentRef.current) {
      const scrollHeight = scrollRef.current.offsetHeight
      const contentHeight = contentRef.current.offsetHeight

      setShowScroll(scrollHeight < contentHeight)
      scrollBottom()
    }
  }, [messages])

  const chatDiv = (msg: any, mIndex: number) => {
    if (msg.role !== 'user') {
      return (
        <div className="flex flex-row mb-4 w-full" key={mIndex}>
          <i className="w-6 h-6 flex-shrink-0 mr-2 rounded-md iconfont icon-jiqiren"></i>
          <div className="min-w-0 bg-primary-border rounded-md p-2 text-left">
            {msg.content ? (
              <ZMarkdown className="max-w-full" content={msg.content} />
            ) : loading ? (
              '思考中...'
            ) : (
              '请重新提问'
            )}
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex flex-row mb-4 w-full justify-end" key={mIndex}>
          <div className="min-w-0 bg-primary rounded-md mr-2 p-2 text-left">
            <ZMarkdown className="max-w-full overflow-x-auto" content={msg.content} />
          </div>
          <i className="w-6 h-6 flex-shrink-0 rounded-md iconfont icon-gerentouxiang"></i>
        </div>
      )
    }
  }

  return (
    <>
      <div ref={scrollRef} className="max-h-full overflow-auto">
        <div ref={contentRef} className="w-full h-full">
          {messages.map((msg, mIndex) => chatDiv(msg, mIndex))}
        </div>
      </div>
      {showScroll && (
        <div
          onClick={scrollBottom}
          className="mt-1 -mb-6 rounded-md pl-4 pr-4 border text-center cursor-pointer max-w-min m-auto"
        >
          <CaretDownOutlined className="h-6" />
        </div>
      )}
    </>
  )
}

export default ChatContent

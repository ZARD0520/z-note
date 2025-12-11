'use client'

import { MarkdownRenderProps } from '@/type/common/component'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'

const zMarkdown: React.FC<MarkdownRenderProps> = ({ content, className = '' }) => {
  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // 自定义代码块渲染
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const isCodeBlock = match

            if (isCodeBlock) {
              return (
                <div className="relative">
                  <div className="absolute top-4 right-4 text-xs text-gray-500 px-2 py-1 rounded">
                    {match[1]}
                  </div>
                  <pre className="rounded-lg overflow-x-auto text-gray-100 p-4 text-sm">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              )
            }

            // 行内代码
            return (
              <code
                className={className + ' bg-gray-300 rounded px-1.5 py-0.5 text-sm font-mono'}
                {...props}
              >
                {children}
              </code>
            )
          },
          // 自定义预格式化块
          pre({ children, ...props }) {
            return <div className="my-4">{children}</div>
          },
          // 其他自定义组件可以根据需要添加
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 mb-2 border-blue-500 pl-4 italic text-gray-600 bg-blue-50 py-2 rounded-r">
                {children}
              </blockquote>
            )
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full divide-y divide-gray-200 border">{children}</table>
              </div>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default zMarkdown

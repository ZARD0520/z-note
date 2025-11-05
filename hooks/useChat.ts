import { ChatMessage } from "@/type/chat";
import React, { useEffect, useRef, useState } from "react";

export function useChat(model: string, role: string = '1', defaultInput = '', defaultActions?: any) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  const hasExecutedRef = useRef(false)

  useEffect(() => {
    if (defaultInput && !hasExecutedRef.current) {
      hasExecutedRef.current = true
      handleSubmit(undefined, defaultInput)
    }
    return () => {
      defaultActions.setInput('')
    }
  }, [])

  const handleSubmit = async (e?: React.FormEvent, defaultInput?: string) => {
    e && e.preventDefault()
    const inputValue = defaultInput || input
    if (!inputValue.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    const assistantMessageId = (Date.now() + 1).toString()
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: ''
    }

    setMessages(prev => [...prev, assistantMessage])

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()

    try {
      const query = new URLSearchParams({
        model,
        role,
        content: inputValue
      })
      const response = await fetch((process.env.NEXT_PUBLIC_SERVER_URL as string) + '/chat/stream?' + query, {
        method: 'GET',
        headers: {
          'Accept': 'text/event-stream'
        },
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        throw new Error(`HTTP ERROR：${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('无法读取响应流')
      }

      const decoder = new TextDecoder()

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          processStreamChunk(chunk, assistantMessageId)
        }
      } finally {
        reader.releaseLock()
      }
    } catch (e: any) {
      if (e.name === 'AbortError') {
        console.warn('请求中止')
      } else {
        console.error('请求失败：', e)
        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMessageId
              ? {
                ...msg,
                content: '抱歉，发生了错误，请稍后重试。'
              }
              : msg
          )
        )
      }
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null;
    }
  }

  const processStreamChunk = (chunk: string, messageId: string) => {
    const lines = chunk.split('\n')
    const events = []
    let currentData = {
      id: '',
      data: '',
      finished: false
    }

    try {
      for (const line of lines) {
        const trimLine = line.trim()
        if (trimLine === '') {
          if (currentData.id || currentData.data) {
            events.push({ ...currentData })
          }
          currentData = { id: '', data: '', finished: false }
          continue
        }

        const index = trimLine.indexOf(':')
        if (index === -1) {
          continue
        }

        const field = trimLine.slice(0, index).trim()
        const value = trimLine.slice(index + 1).trim()

        if (field === 'id') {
          currentData.id = value
        } else if (field === 'data') {
          const data = JSON.parse(value).d || ''
          const finished = !!JSON.parse(value).f
          if (data) {
            currentData.data = data
          }
          if (finished) {
            currentData.finished = !!finished
          }
        }
      }
      events.forEach(data => {
        if (data.id === '1' && !data.data && data.finished) {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === messageId
                ? { ...msg, content: '无法回答您的问题，请重新提问' }
                : msg
            )
          );
          return
        } else if (!data.finished && data.data) {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === messageId
                ? { ...msg, content: msg.content + data.data }
                : msg
            )
          );
        } else if (data.finished) {
          return
        }
      })
    } catch (error) {
      console.error('解析 JSON 失败:', error);
      // 如果不是 JSON，直接作为文本显示
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId
            ? { ...msg, content: '出错了，请稍后重新提问' }
            : msg
        )
      );
    }
  }

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setMessages(prev =>
        prev.map((msg, msgIndex) =>
          msgIndex === prev.length - 1
            ? {
              ...msg,
              content: msg.content || '已停止生成，请重新提问'
            }
            : msg
        )
      )
    }
    setIsLoading(false)
    abortControllerRef.current = null
  }

  const clearAllMessages = () => {
    setMessages([])
  }

  /* if (defaultInput) {
    handleSubmit(undefined, defaultInput)
  } */

  return {
    handleSubmit,
    stopGeneration,
    setInput,
    clearAllMessages,
    messages,
    input,
    isLoading
  }
}
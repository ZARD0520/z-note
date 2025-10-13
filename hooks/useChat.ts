import { ChatMessage } from "@/type/chat";
import React, { useRef, useState } from "react";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input
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
        content: input,
        history: JSON.stringify([...messages, userMessage])
      })
      const response = await fetch((process.env.SERVER_URL as string) + '?' + query, {
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
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const dataStr = line.slice(6);

        if (dataStr === '[DONE]') {
          return;
        }

        try {
          const data = JSON.parse(dataStr);

          if (data.content) {
            setMessages(prev =>
              prev.map(msg =>
                msg.id === messageId
                  ? { ...msg, content: msg.content + data.content }
                  : msg
              )
            );
          }
        } catch (error) {
          console.error('解析 JSON 失败:', error);
          // 如果不是 JSON，直接作为文本显示
          setMessages(prev =>
            prev.map(msg =>
              msg.id === messageId
                ? { ...msg, content: msg.content + dataStr }
                : msg
            )
          );
        }
      }
    }
  }

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setIsLoading(false)
  }

  return {
    handleSubmit,
    stopGeneration,
    setInput,
    messages,
    input,
    isLoading
  }
}
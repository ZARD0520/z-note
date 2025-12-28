'use client'
import { useChat } from '@/hooks/useChat'
import SearchChat from './searchChat'
import ChatHeader from './chatHeader'
import ChatContent from '../[id]/chatContent'
import { useCallback, useState } from 'react'
import { getModelList, getRoleList } from '@/constants/chat'
import { useChatActions, useChatInput } from '@/store/useChatStore'
import { useI18n } from '@/i18n'

export default function ChatContainer() {
  const { dict } = useI18n()
  const modelList = getModelList(dict)
  const roleList = getRoleList(dict)
  const [menuValue, setMenuValue] = useState(modelList[0].key)
  const [roleKey, setRoleKey] = useState(roleList[0].key)
  const defaultInput = useChatInput()
  const chatActions = useChatActions()
  const { messages, isLoading, input, setInput, handleSubmit, stopGeneration, clearAllMessages } =
    useChat(menuValue as string, roleKey as string, defaultInput ?? '', chatActions)

  const clickModelItem = useCallback(({ key }: { key: string }) => {
    setMenuValue(key)
  }, [])

  const clickRoleItem = ({ key }: { key: string }) => {
    setRoleKey(key)
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <ChatHeader
        handleClear={clearAllMessages}
        handleClickModelItem={clickModelItem}
        menuValue={menuValue as string}
        clearText={dict.base.clear}
        backText={dict.base.back}
      ></ChatHeader>
      <div className="text-center flex-1 mt-2 overflow-hidden pb-8">
        <ChatContent messages={messages} loading={isLoading} />
      </div>
      <SearchChat
        placeholder={dict.chat.input.placeholder}
        roleKey={String(roleKey)}
        handleSelectRole={clickRoleItem}
        handleSubmit={handleSubmit}
        handleStop={stopGeneration}
        setInput={setInput}
        isLoading={isLoading}
        input={input}
        className="mt-2 justify-end"
      ></SearchChat>
    </div>
  )
}

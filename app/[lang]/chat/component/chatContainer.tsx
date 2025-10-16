'use client'
import { useChat } from "@/hooks/useChat";
import SearchChat from "./searchChat";
import ChatHeader from "./chatHeader"
import ChatContent from "../[id]/chatContent";
import { useCallback, useState } from "react";
import { modelList } from "@/constants/chat";

export default function ChatContainer({ dict }: { dict: any }) {
  const [menuValue, setMenuValue] = useState(modelList[0].key)
  const { messages, isLoading, input, setInput, handleSubmit, clearAllMessages } = useChat(menuValue as string)


  const clickModelItem = useCallback(({ key }: { key: string }) => {
    setMenuValue(key)
  }, [])

  return (
    <div className="h-full flex flex-col justify-between">
      <ChatHeader handleClear={clearAllMessages} handleClickModelItem={clickModelItem} menuValue={menuValue as string} clearText={dict.base.clear} backText={dict.base.back}></ChatHeader>
      <div className="text-center flex-1 mt-2 overflow-hidden pb-8">
        <ChatContent messages={messages} />
      </div>
      <SearchChat placeholder={'请输入你想问的问题'} handleSubmit={handleSubmit} setInput={setInput} isLoading={isLoading} input={input} className='mt-2 justify-end'></SearchChat>
    </div>
  )
}
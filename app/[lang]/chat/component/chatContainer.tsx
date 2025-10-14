'use client'
import { useChat } from "@/hooks/useChat";
import SearchChat from "./searchChat";
import ChatHeader from "./chatHeader"
import ChatContent from "../[id]/chatContent";

export default function ChatContainer({ dict }: { dict: any }) {
  const { messages, isLoading, input, setInput, handleSubmit } = useChat()
  return (
    <div className="h-full flex flex-col justify-between">
      <ChatHeader clearText={dict.base.clear} backText={dict.base.back}></ChatHeader>
      <div className="text-center flex-1 mt-2 overflow-hidden pb-8">
        <ChatContent messages={messages} />
      </div>
      <SearchChat placeholder={'请输入你想问的问题'} handleSubmit={handleSubmit} setInput={setInput} isLoading={isLoading} input={input} className='mt-2 justify-end'></SearchChat>
    </div>
  )
}
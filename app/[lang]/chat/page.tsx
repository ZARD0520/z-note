'use client'
import SearchChat from "./component/searchChat";
import ChatHeader from "./component/chatHeader"
import { getDictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import ChatContent from "./[id]/chatContent";
import { useChat } from "@/hooks/useChat";
import { useState } from "react";

export default function Chat({ params: { lang } }: {
  params: {
    lang: Locale
  }
}) {
  const { messages, isLoading, input, setInput, handleSubmit } = useChat()

  const [dict, setDict] = useState<any>()
  getDictionary(lang).then((res) => {
    setDict(res)
  })
  return (
    <div className="h-full flex flex-col justify-between">
      <ChatHeader clearText={dict.base.clear} backText={dict.base.back}></ChatHeader>
      <div className="text-center flex-1 mt-2 overflow-hidden pb-8">
        <ChatContent messages={messages} />
      </div>
      <SearchChat placeholder={'测试'} handleSubmit={handleSubmit} setInput={setInput} isLoading={isLoading} input={input} className='mt-2 justify-end'></SearchChat>
    </div>
  )
}
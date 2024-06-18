import SearchChat from "./component/searchChat";
import ChatHeader from "./component/chatHeader"
import { getDictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import ChatContent from "./[id]/chatContent";

export default async function Chat({ params: { lang } }: {
  params: {
    lang: Locale
  }
}) {
  
  const dict = await getDictionary(lang)
  return (
    <div className="h-full flex flex-col justify-between">
      <ChatHeader clearText={dict.base.clear} backText={dict.base.back}></ChatHeader>
      <div className="text-center flex-1 mt-2 overflow-hidden pb-8">
        <ChatContent />
      </div>
      <SearchChat className='mt-2 justify-end'></SearchChat>
    </div>
  )
}
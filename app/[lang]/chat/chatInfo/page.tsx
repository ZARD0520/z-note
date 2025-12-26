import { getDictionary } from '@/i18n'
import ChatContainer from './component/chatContainer'
import { Locale } from '@/i18n/config'

export default async function ChatInfo({
  params: { lang },
}: {
  params: {
    lang: Locale
  }
}) {
  const dict = await getDictionary(lang)
  return <ChatContainer dict={dict}></ChatContainer>
}

import { getDictionary } from '@/i18n'
import ChatContainer from './component/chatContainer'
import { DefaultPageProps } from '@/type/common/component'

export default async function ChatInfo({ params: { lang } }: DefaultPageProps) {
  const dict = await getDictionary(lang)
  return <ChatContainer dict={dict}></ChatContainer>
}

import ChatContainer from './component/chatContainer'
import { DefaultPageProps } from '@/type/common/component'

export default async function ChatInfo({ params: { lang } }: DefaultPageProps) {
  return <ChatContainer></ChatContainer>
}

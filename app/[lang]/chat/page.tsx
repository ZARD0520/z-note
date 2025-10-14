import { getDictionary } from "@/i18n";
import ChatContainer from "./component/chatContainer";

export default async function Chat(params: any) {
  const dict = await getDictionary(params.lang)

  return (
    <ChatContainer dict={dict}></ChatContainer>
  )
}
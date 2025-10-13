'use client'

import ZSearchInput from "@/components/common/z-search-input"
import { SetStateAction } from "react"
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface searchChatProps {
  placeholder?: string
  isLoading?: boolean
  input?: string
  setInput?: Function
  handleSubmit?: Function
  className?: string
}

const searchChat: React.FC<searchChatProps> = ({
  placeholder = '',
  input,
  isLoading,
  setInput,
  handleSubmit,
  className
}) => {

  const router = useRouter()
  const hasRouterParams = useSearchParams().size

  const handleInput = (e: { target: { value: SetStateAction<string> } }) => {
    if (!hasRouterParams) {
      router.push(`/chat?id=${123456}`)
    }
    console.log(e.target.value)
    // setInput && setInput(e.target.value)
  }

  const handleChat = (e: React.FormEvent) => {
    // 判断当前是否为首页，是则路由跳转，不是则发送消息
    if (!hasRouterParams) {
      // 路由跳转,uid由用户id决定
      router.push(`/chat?id=${123456}`)
    }
    // 调用ai，发送消息
    handleSubmit && handleSubmit(e)
  }

  return (
    <div className={className}>
      <ZSearchInput type="text" onChange={handleInput} value={input} onSearch={handleChat} placeholder={placeholder} isLoading={isLoading} />
    </div>
  )
}

export default searchChat
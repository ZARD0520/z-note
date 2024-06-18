'use client'

import ZSearchInput from "@/components/common/z-search-input"
import { SetStateAction, useState } from "react"
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface searchChatProps {
  placeholder?: string
  className?: string
}

const searchChat: React.FC<searchChatProps> = ({
  placeholder = '',
  className
}) => {

  const router = useRouter()
  const hasRouterParams = useSearchParams().size
  const [inputValue, setInputValue] = useState('')

  const handleInput = (e: { target: { value: SetStateAction<string> } }) => {
    setInputValue(e.target.value)
  }

  const handleChat = () => {
    // 判断当前是否为首页，是则路由跳转，不是则发送消息
    if (!hasRouterParams) {
      // 路由跳转,uid由用户id决定
      router.push(`/chat?id=${123456}`)
    }
    // 调用ai，发送消息
  }

  return (
    <div className={className}>
      <ZSearchInput type="text" onChange={handleInput} value={inputValue} onSearch={handleChat} placeholder={placeholder} />
    </div>
  )
}

export default searchChat
'use client'

import ZSearchInput from "@/app/[lang]/chat/component/searchInput"
import { SetStateAction, useState } from "react"
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useChatActions, useChatInput } from "@/store/useChatStore";
import { onSelectRoleType } from "@/type/chat";

interface searchChatProps {
  placeholder?: string
  isLoading?: boolean
  input?: string
  setInput?: Function
  roleKey?: string
  handleSelectRole?: onSelectRoleType
  handleStop?: () => void
  handleSubmit?: (e?: React.FormEvent) => void
  className?: string
}

const searchChat: React.FC<searchChatProps> = ({
  placeholder = '',
  input,
  isLoading,
  setInput,
  roleKey,
  handleSelectRole,
  handleSubmit,
  handleStop,
  className
}) => {

  const router = useRouter()
  const hasRouterParams = useSearchParams().size

  const tempInput = useChatInput()
  const chatActions = useChatActions()

  const handleInput = (e: { target: { value: SetStateAction<string> } }) => {
    if (!hasRouterParams) {
      chatActions.setInput(e.target.value as string)
    }
    setInput && setInput(e.target.value)
  }

  const handleChat = (e?: React.FormEvent) => {
    // 判断当前是否为首页，是则路由跳转，不是则发送消息
    if (!hasRouterParams) {
      // 路由跳转,uid由用户id决定
      router.push(`/chat?id=${123}`)
    }
    // 调用ai，发送消息
    isLoading ? handleStop?.() : handleSubmit?.(e)
  }

  const getValue = () => {
    return hasRouterParams ? input : tempInput
  }

  return (
    <div className={className}>
      <ZSearchInput type="text" rows={1} roleKey={roleKey} onSelectRole={handleSelectRole} onChange={handleInput} value={getValue()} onSearch={handleChat} placeholder={placeholder} isLoading={isLoading} />
    </div>
  )
}

export default searchChat
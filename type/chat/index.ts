import { StaticImageData } from 'next/image'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export type onSearchType = (e?: React.FormEvent) => void

export type onSelectRoleType = ({ key }: { key: string }) => void

export interface HeaderProps {
  title: string
  popContent: React.ReactNode
  children: React.ReactNode
}

export interface chatHeaderProps {
  clearText: string
  backText: string
  menuValue: string
  handleClickModelItem: ({ key }: { key: string }) => void
  handleClear: () => void
}

export interface searchChatProps {
  lang?: string
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

export interface searchInputSuffixProps {
  valueKey: string
  onSelect?: onSelectRoleType
  onSearch?: onSearchType
  loading?: boolean
}

export interface chatContentProps {
  loading: boolean
  messages: ChatMessage[]
}

export interface SideNavProps {
  className?: string
  img: StaticImageData | HTMLImageElement
  lang: string
  children: Array<any>
}

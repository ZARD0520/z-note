import { TextareaHTMLAttributes } from 'react'
import { onSearchType, onSelectRoleType } from '../chat'
import { Locale } from '@/i18n/config'

export interface DefaultPageProps {
  params: {
    lang: Locale
  }
}

// 输入框
export interface InputComponentProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  type: 'text' | 'email' | 'password' | 'number' | 'search'
  roleKey?: string
  onSearch?: onSearchType
  onSelectRole?: onSelectRoleType
  className?: string
  suffix?: (onSearch?: onSearchType) => React.ReactNode
  isLoading?: boolean
  dict: Record<string, any>
}

// 下拉选择框
export interface SelectItem {
  label: string
  key: number | string
  icon?: React.ReactNode
  disabled?: boolean
}

// Markdown
export interface MarkdownRenderProps {
  content: string
  className?: string
}

export interface DraggableComponentProps {
  children: React.ReactNode
  initialPosition?: { x: number; y: number }
}

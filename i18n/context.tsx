'use client'

import { createContext, useContext, type ReactNode } from 'react'

// 定义字典类型（根据实际字典结构调整）
export type Dictionary = Record<string, any>

interface I18nContextType {
  dict: Dictionary
  locale: string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

interface I18nProviderProps {
  children: ReactNode
  dict: Dictionary
  locale: string
}

export function I18nProvider({ children, dict, locale }: I18nProviderProps) {
  return <I18nContext.Provider value={{ dict, locale }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

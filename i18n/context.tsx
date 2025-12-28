'use client'

import { createContext, useContext } from 'react'
import type { Dictionary, I18nContextType, I18nProviderProps } from '@/type/i18n'

const I18nContext = createContext<I18nContextType | undefined>(undefined)

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

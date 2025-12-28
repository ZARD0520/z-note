/**
 * 多语言字典类型定义
 */
export type Dictionary = Record<string, any>

/**
 * I18n Context 类型定义
 */
export interface I18nContextType {
  dict: Dictionary
  locale: string
}

/**
 * I18n Provider Props 类型定义
 */
export interface I18nProviderProps {
  children: React.ReactNode
  dict: Dictionary
  locale: string
}

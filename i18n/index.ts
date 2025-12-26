// import 'server-only'
import type { Locale } from './config'
import enUS from 'antd/es/locale/en_US'
import zhCN from 'antd/es/locale/zh_CN'

const dictionaries = {
  en: () =>
    import('./locales/en.json').then((module) => {
      return { ...module.default, ...enUS }
    }),
  zh: () =>
    import('./locales/zh.json').then((module) => {
      return { ...module.default, ...zhCN }
    }),
  ja: () =>
    import('./locales/ja.json').then((module) => {
      return { ...module.default, ...enUS }
    }),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.en()

const i18n = {
  defaultLocale: 'zh',
  locales: ['zh', 'en', 'ja'],
} as const

export default i18n

export type Locale = (typeof i18n)['locales'][number]

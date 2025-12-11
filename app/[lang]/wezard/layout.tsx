import { Locale } from '@/i18n/config'
import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'ZARD空间',
  description: 'wezard中国',
  icons: {
    icon: '/images/zard.jpg',
  },
}

export default async function ZardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: Locale }
}>) {
  return <>{children}</>
}

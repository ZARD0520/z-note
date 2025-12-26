import { Locale } from '@/i18n/config'
import { Metadata } from 'next/types'
import { getDictionary } from '@/i18n'

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  return {
    title: dict.zard.layout.title,
    description: dict.zard.layout.description,
    icons: {
      icon: '/images/zard.jpg',
    },
  }
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

import { Metadata } from 'next/types'
import { getDictionary } from '@/i18n'
import { DefaultPageProps } from '@/type/common/component'

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
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
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}

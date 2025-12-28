import { Header } from './component/header'
import { MainContent } from './component/mainContent'
import { Footer } from './component/footer'
import { FloatingBackButton } from '../../../../components/wezard/back'
import i18n from '@/i18n/config'
import { DefaultPageProps } from '@/type/common/component'

export default async function WezardIntroduce({ params: { lang } }: DefaultPageProps) {
  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <FloatingBackButton />
      <Header />
      <MainContent />
      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }))
}

import { FloatingBackButton } from '@/components/wezard/back'
import { Locale } from '@/i18n/config'

export default async function WezardPhoto({
  params: { lang },
}: {
  params: {
    lang: Locale
  }
}) {
  return (
    <div className="h-screen overflow-auto bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 text-white">
      <FloatingBackButton />
    </div>
  )
}

import { getDictionary } from '@/i18n'
import { Locale } from '@/i18n/config'
import WezardHome from '@/components/wezard/home'

export default async function Zard({
  params: { lang },
}: {
  params: {
    lang: Locale
  }
}) {
  const dict = await getDictionary(lang)

  return <WezardHome dict={dict} />
}

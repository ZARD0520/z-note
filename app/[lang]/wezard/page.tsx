import { getDictionary } from '@/i18n'
import WezardHome from '@/components/wezard/home'
import { DefaultPageProps } from '@/type/common/component'

export default async function Zard({ params: { lang } }: DefaultPageProps) {
  const dict = await getDictionary(lang)

  return <WezardHome dict={dict} />
}

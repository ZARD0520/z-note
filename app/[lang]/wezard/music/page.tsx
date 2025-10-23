import { getDictionary } from "@/i18n"
import { Locale } from "@/i18n/config"
import Album from './component/album'

export default async function WezardAlbums({ params: { lang } }: {
  params: {
    lang: Locale
  }
}) {
  const dict = await getDictionary(lang)

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <Album dict={dict} />
    </div>
  )
}
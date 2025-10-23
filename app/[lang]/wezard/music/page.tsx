import { getDictionary } from "@/i18n"
import { Locale } from "@/i18n/config"
import AlbumGrid from './component/album'
import { FloatingBackButton } from "@/components/wezard/back"

export default async function WezardAlbums({ params: { lang } }: {
  params: {
    lang: Locale
  }
}) {
  const dict = await getDictionary(lang)

  return (
    <div className="h-screen overflow-auto bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 text-white">
      <FloatingBackButton />
      <AlbumGrid dict={dict}/>
    </div>
  )
}
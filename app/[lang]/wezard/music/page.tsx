import { getDictionary } from "@/i18n"
import { Locale } from "@/i18n/config"
import AlbumGrid from './component/album'
import { FloatingBackButton } from "@/components/wezard/back"

async function getFirstPageData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}?type=music&current=1&limit=10`, {
    next: { revalidate: 300 } // 5分钟重新验证
  })
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default async function WezardAlbums({ params: { lang } }: {
  params: {
    lang: Locale
  }
}) {
  const dict = await getDictionary(lang)
  const firstPageData = await getFirstPageData()

  return (
    <div className="h-screen overflow-auto bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 text-white">
      <FloatingBackButton />
      <AlbumGrid dict={dict} initialData={firstPageData} initialPage={1}/>
    </div>
  )
}
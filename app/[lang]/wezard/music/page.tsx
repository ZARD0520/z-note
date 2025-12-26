import { getDictionary } from '@/i18n'
import AlbumGrid from './component/album'
import { FloatingBackButton } from '@/components/wezard/back'
import { getAlbumList } from '@/api'
import { Album, AlbumType } from '@/type/wezard/albums'
import { DefaultPageProps } from '@/type/common/component'

export default async function WezardAlbums({ params: { lang } }: DefaultPageProps) {
  const dict = await getDictionary(lang)
  let initialAlbumData: Album[] = []
  let initialPagination = {
    current: 0,
    limit: 10,
    total: 0,
    pages: 1,
  }

  try {
    const res = await getAlbumList({ type: AlbumType.MUSIC, current: 1, limit: 10 })
    if (res) {
      initialAlbumData = res.data
      initialPagination = res.pagination
    }
  } catch (e) {
    console.error(e)
  }

  return (
    <div className="h-screen overflow-auto bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 text-white">
      <FloatingBackButton />
      <AlbumGrid dict={dict} initialData={initialAlbumData} initialPagination={initialPagination} />
    </div>
  )
}

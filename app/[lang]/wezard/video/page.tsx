import { getDictionary } from '@/i18n'
import VideoBox from './component/videoBox'
import { FloatingBackButton } from '@/components/wezard/back'
import { getAlbumList } from '@/api'
import { Album, AlbumType } from '@/type/wezard/albums'
import { DefaultPageProps } from '@/type/common/component'

export default async function WezardVideo({ params: { lang } }: DefaultPageProps) {
  const dict = await getDictionary(lang)
  let initialVideoData: Album[] = []
  let initialPagination = {
    current: 0,
    limit: 10,
    total: 0,
    pages: 1,
  }

  try {
    const res = await getAlbumList({ type: AlbumType.VIDEO, current: 1, limit: 10 })
    if (res) {
      initialVideoData = res.data
      initialPagination = res.pagination
    }
  } catch (e) {
    console.error(e)
  }

  return (
    <div className="h-screen overflow-auto bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 text-white">
      <FloatingBackButton />
      <VideoBox dict={dict} initialData={initialVideoData} initialPagination={initialPagination} />
    </div>
  )
}

import Header from '@/components/chat/header'
import { ConfigProvider, Popover } from 'antd'
import PageContent from '@/components/chat/pageContent'
import SideNav from '@/components/chat/sidenav'
import ZDrag from '@/components/common/z-drag'
import img from '@/public/images/AI.png'
import { getDictionary } from '@/i18n'
import payImg from '@/public/images/alipay.jpg'
import zardImg from '@/public/images/zard.jpg'
import { Locale } from '@/i18n/config'
import Image from 'next/image'
import { Metadata } from 'next/types'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '小Z助手',
  description: '躺平小助手',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function ChatLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: Locale }
}>) {
  const dictionary = await getDictionary(params.lang)
  const popContent = (
    <div className="flex flex-row items-center justify-center cursor-pointer">
      <Image className="w-8 h-8 mr-2" src={zardImg} alt="zard-logo" />
      <Link href="/wezard">{dictionary.chat.layout.enterZard}</Link>
    </div>
  )
  const mineContent = (
    <>
      <div>{dictionary.chat.layout.register}</div>
      <div>{dictionary.chat.layout.login}</div>
      <div>{dictionary.chat.layout.logout}</div>
    </>
  )

  const payContent = (
    <div className="text-center">
      <Image className="h-36 w-36" src={payImg} alt="LikeAuthor" />
      <p>{dictionary.chat.layout.thankSupport}</p>
    </div>
  )
  return (
    <ConfigProvider locale={dictionary}>
      <Header title={dictionary.title} popContent={popContent}>
        <Popover content={mineContent} trigger="click" placement="bottomRight">
          <div className="mt-2 mb-2 rounded-full bg-primary-background w-8 h-8 flex items-center justify-center">
            <i className="text-primary iconfont icon-wode cursor-pointer"></i>
          </div>
        </Popover>
      </Header>
      <div className="flex-1 flex flex-row h-full items-start overflow-auto">
        <ZDrag>
          <SideNav img={img} lang={params.lang}>
            <i className="iconfont icon-zhuye1" data-title={dictionary.home} data-href="/"></i>
            <i
              className="iconfont icon-huihua"
              data-title={dictionary.talkHistory}
              data-href="/talkHistory"
            ></i>
            <i
              className="iconfont icon-gongju"
              data-title={dictionary.tools}
              data-href="/tools"
            ></i>
            <i
              className="iconfont icon-zanshang"
              data-title={dictionary.donation}
              data-content={payContent}
            ></i>
          </SideNav>
        </ZDrag>
        <PageContent>{children}</PageContent>
      </div>
    </ConfigProvider>
  )
}

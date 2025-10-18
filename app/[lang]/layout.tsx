import type { Metadata } from "next";
import Image from 'next/image'
import { Inter } from "next/font/google";
import "./globals.css";
import i18n, { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import Header from "@/components/home/header";
import { ConfigProvider, Popover } from "antd";
import PageContent from "@/components/home/pageContent";
import SideNav from "@/components/home/sidenav";
import ZDrag from "@/components/common/z-drag";
import img from "@/public/images/AI.png"
import payImg from "@/public/images/alipay.jpg"
// import ClientSideMonitor from '@/components/monitor'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "小Z助手",
  description: "躺平小助手",
};

export async function generateStaticParams() {
  return i18n.locales.map((l) => ({ lang: l }))
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode,
  params: { lang: Locale }
}>) {

  const dictionary = await getDictionary(params.lang)
  const popContent = (
    <div>记账本</div>
  )
  const mineContent = (
    <>
      <div>注册</div>
      <div>登录</div>
      <div>退出</div>
    </>
  )

  const payContent = (
    <div className="text-center">
      <Image className="h-36 w-36" src={payImg} alt="LikeAuthor" />
      <p>感谢支持</p>
    </div>
  )

  return (
    <html lang={params.lang} data-theme="primary">
      <head>
        <link rel="stylesheet" href="//at.alicdn.com/t/c/font_4575924_i6io7edr99c.css"></link>
      </head>
      <body className={inter.className + ' bg-primary-background min-h-screen max-h-screen flex flex-col overflow-x-hidden'}>
        <ConfigProvider locale={dictionary}>
          <Header title={dictionary.title} popContent={popContent}>
            <Popover content={mineContent} trigger="click" placement="bottomRight">
              <div className="rounded-full bg-primary-background w-8 h-8 flex items-center justify-center">
                <i className="text-primary iconfont icon-wode cursor-pointer"></i>
              </div>
            </Popover>
          </Header>
          <div className="flex-1 flex flex-row h-full items-start overflow-auto">
            <ZDrag>
              <SideNav className="" img={img} lang={params.lang}>
                <i className="iconfont icon-zhuye1" data-title={dictionary.home} data-href="/"></i>
                <i className="iconfont icon-huihua" data-title={dictionary.talkHistory} data-href="/talkHistory"></i>
                <i className="iconfont icon-gongju" data-title={dictionary.tools} data-href="/tools"></i>
                <i className="iconfont icon-zanshang" data-title={dictionary.donation} data-content={payContent}></i>
              </SideNav>
            </ZDrag>
            <PageContent>{children}</PageContent>
          </div>
        </ConfigProvider>
        {/* <ClientSideMonitor /> */}
      </body>
    </html>
  );
}

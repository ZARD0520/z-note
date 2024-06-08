import type { Metadata } from "next";
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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "祥子日记",
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

  return (
    <html lang={params.lang} data-theme="primary">
      <head>
        <link rel="stylesheet" href="//at.alicdn.com/t/c/font_4575924_7hzfb92lawb.css"></link>
      </head>
      <body className={inter.className + ' bg-primary-background min-h-screen flex flex-col'}>
        <ConfigProvider locale={dictionary}>
          <Header title={dictionary.title} popContent={popContent}>
            <Popover content={mineContent} trigger="click" placement="bottomRight">
              <i className="iconfont icon-wode text-primary-text cursor-pointer"></i>
            </Popover>
          </Header>
          <div className="flex-1 flex flex-row h-full items-start overflow-auto">
            <ZDrag>
              <SideNav className="" img={img} lang={params.lang}>
                <i className="iconfont icon-zhuye1" data-title={dictionary.home} data-href="/"></i>
                <i className="iconfont icon-huihua" data-title={dictionary.talkHistory} data-href="/talkHistory"></i>
                <i className="iconfont icon-gongju" data-title={dictionary.tools} data-href="/tools"></i>
                <i className="iconfont icon-zanshang" data-title={dictionary.donation}></i>
              </SideNav>
            </ZDrag>
            <PageContent>{children}</PageContent>
          </div>
        </ConfigProvider>
      </body>
    </html>
  );
}

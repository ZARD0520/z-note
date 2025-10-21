import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import i18n, { Locale } from "@/i18n/config";
// import ClientSideMonitor from '@/components/monitor'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Z",
  description: "wezard && ai assitant",
  icons: {
    icon: '/images/zard.jpg'
  }
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
  return (
    <html lang={params.lang} data-theme="primary">
      <head>
        <link rel="stylesheet" href="//at.alicdn.com/t/c/font_4575924_ivmqs9cpfh.css"></link>
      </head>
      <body className={inter.className + ' bg-primary-background min-h-screen max-h-screen flex flex-col overflow-x-hidden'}>
        {children}
        {/* <ClientSideMonitor /> */}
      </body>
    </html>
  );
}

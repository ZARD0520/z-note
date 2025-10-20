import { Locale } from "@/i18n/config";

export default async function ZardLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode,
  params: { lang: Locale }
}>) {
  return (
    <>{children}</>
  )
}
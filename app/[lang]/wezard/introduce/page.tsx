import { getDictionary } from "@/i18n";
import { Header } from "./component/header";
import { MainContent } from "./component/mainContent";
import { Footer } from "./component/footer";
import { FloatingBackButton } from "./component/back";
import { Locale } from "@/i18n/config";

export default async function WezardIntroduce({ params: { lang } }: {
  params: {
    lang: Locale
  }
}) {
  const dict = await getDictionary(lang)

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <FloatingBackButton />
      <Header dict={dict}/>
      <MainContent dict={dict}/>
      <Footer dict={dict}/>
    </div>
  )
}
import { getDictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import Link from 'next/link'
import Image from "next/image";
import aiImg from "@/public/images/AI.png"
import zardImg from "@/public/images/zard.jpg"

export default async function Home({ params: { lang } }: {
  params: {
    lang: Locale
  }
}) {
  const dict = await getDictionary(lang)

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Link href="/chat" className="rounded-lg w-80 pt-4 pb-4 pl-4 flex flex-row items-center border mb-8">
        <Image className="w-20 mr-4" src={aiImg} alt="AI" />
        <p className="font-bold text-3xl" >{dict.title}</p>
      </Link>
      <Link href="/wezard" className="rounded-lg w-80 pt-4 pb-4 pl-4 flex flex-row items-center border">
        <Image className="w-20 mr-4" src={zardImg} alt="ZARD" />
        <p className="font-bold text-3xl">{dict.titleZ}</p>
      </Link>
    </div>
  );
}

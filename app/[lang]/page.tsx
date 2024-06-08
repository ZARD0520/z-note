import { getDictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import ZInput from "@/components/common/z-input";
import Link from "next/link";

export default async function Home({ params: { lang } }: {
  params: {
    lang: Locale
  }
}) {
  const dict = await getDictionary(lang)
  const tools = [
    {
      title: '制定退休计划',
      img: 'icon-jihua',
      href: ''
    },
    {
      title: '五险一金计算器',
      img: 'icon-jisuanqi_o',
      href: ''
    },
    {
      title: '简历制作',
      img: 'icon-zhizuo',
      href: ''
    },
    {
      title: '更多功能',
      img: 'icon-gengduo',
      href: '/tools'
    },
  ]
  const suffixInput = (
    <i className="iconfont icon-fasong text-primary-disabled"></i>
  )
  return (
    <div className="h-full text-center flex flex-col justify-between">
      <div className="m-auto max-w-min flex-none">
        <p className="typewriter font-bold">{dict.description}__&nbsp;</p>
      </div>
      <div className="flex-1 mt-8">
        <p className="typewriter-once m-auto max-w-min">{dict["root-welcome"]}</p>
        <div className="m-8 grid md:grid-cols-2 gap-4">
          {
            tools.map((tool, index) => {
              if (tool.href) {
                return (
                  <Link key={index} href={tool.href}>
                    <div className="hover:text-white pt-4 pb-4 bg-primary-background rounded-md hover:bg-primary-disabled cursor-pointer">
                      <i className={'iconfont ' + tool.img}></i>
                      <p>{tool.title}</p>
                    </div>
                  </Link>
                )
              } else {
                return (
                  <div key={index} className="hover:text-white pt-4 pb-4 bg-primary-background rounded-md hover:bg-primary-disabled cursor-pointer">
                    <i className={'iconfont ' + tool.img}></i>
                    <p>{tool.title}</p>
                  </div>
                )
              }
            })
          }
        </div>
      </div>
      <div className="mt-8">
        <ZInput type="text" placeholder={dict.input.placeholder} suffix={suffixInput} className="border-2 border-primary-border" />
      </div>
    </div>
  );
}

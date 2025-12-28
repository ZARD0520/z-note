import { getDictionary } from '@/i18n'
import Link from 'next/link'
import SearchChat from './chatInfo/component/searchChat'
import { DefaultPageProps } from '@/type/common/component'

export default async function Chat({ params: { lang } }: DefaultPageProps) {
  const dict = await getDictionary(lang)
  const tools = [
    {
      title: dict.chat.tools.plan,
      img: 'icon-jihua',
      href: '',
    },
    {
      title: dict.chat.tools.finance,
      img: 'icon-jisuanqi_o',
      href: '',
    },
    {
      title: dict.chat.tools.resume,
      img: 'icon-zhizuo',
      href: '',
    },
    {
      title: dict.chat.tools.more,
      img: 'icon-gengduo',
      href: '/tools',
    },
  ]

  return (
    <div className="h-full text-center flex flex-col justify-between">
      <div className="m-auto max-w-min flex-none">
        <p className="typewriter font-bold">{dict.description}__&nbsp;</p>
      </div>
      <div className="flex-1 mt-6">
        <p className="typewriter-once m-auto max-w-min">{dict['root-welcome']}</p>
        <div className="m-2 mt-6 md:m-10 grid grid-cols-2 md:grid-cols-4 gap-5">
          {tools.map((tool, index) => {
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
                <div
                  key={index}
                  className="hover:text-white pt-4 pb-4 bg-primary-background rounded-md hover:bg-primary-disabled cursor-pointer"
                >
                  <i className={'iconfont ' + tool.img}></i>
                  <p>{tool.title}</p>
                </div>
              )
            }
          })}
        </div>
      </div>
      <div className="pb-2">
        <SearchChat lang={lang} placeholder={dict.input.placeholder}></SearchChat>
      </div>
    </div>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Popover, Tooltip } from 'antd'
import { SideNavProps } from '@/type/chat'

const SideNav: React.FC<SideNavProps> = ({ className, img, lang, children }) => {
  const pathname = usePathname().replace('/' + lang, '/')

  const handleNav: (e: any) => void = (event) => {
    const sideNavContent = document.querySelector('#sideNavContent')
    if (sideNavContent) {
      sideNavContent.classList.toggle('h-0')
    }
  }

  return (
    <nav className={'min-h-0 w-16 bg-primary rounded-md text-center ' + className}>
      <div
        className="m-auto pt-2 pb-2 rounded-full text-primary-text w-10 flex justify-center items-center cursor-pointer"
        onClick={handleNav}
      >
        <Image src={img} alt="Image" className={'transition duration-300 ease-in-out'}></Image>
      </div>
      {children ? (
        <div
          id="sideNavContent"
          className="transition-all duration-300 ease-out overflow-hidden text-primary-text"
        >
          {children.map((child, index) => {
            let href = child?.props?.['data-href']
            let content = child?.props?.['data-content']

            if (href) {
              return (
                <Link href={href} key={index}>
                  <Tooltip placement="right" arrow={false} title={child?.props?.['data-title']}>
                    <div
                      className={
                        `p-4 cursor-pointer rounded-md hover:bg-primary-hover` +
                        (pathname === href ? ' bg-primary-hover' : '')
                      }
                    >
                      {child}
                    </div>
                  </Tooltip>
                </Link>
              )
            } else if (content) {
              return (
                <Popover key={index} content={content} placement="right">
                  <div className="p-4 cursor-pointer rounded-md hover:bg-primary-hover">
                    {child}
                  </div>
                </Popover>
              )
            }
          })}
        </div>
      ) : null}
    </nav>
  )
}

export default SideNav

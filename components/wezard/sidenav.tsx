'use client'

import { WezardSideNavProps } from "@/type/wezard/home";
import { useEffect, useState } from "react";

const SideNav: React.FC<WezardSideNavProps> = ({ contentList, isMobile, currentPage, goToPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false)
    }
  }, [isMobile])

  const handleMobileGo = (index: number) => {
    setIsOpen(false)
    goToPage(index)
  }

  const showContent = !isMobile ?
    (<nav className="absolute w-20 right-2 top-2 z-50 mt-16 mr-12 flex flex-col border-l-2">
      {
        contentList.map((item, index) => (
          <p onClick={() => goToPage(index)} className={`w-full pl-8 mb-8 text-gray-200 cursor-pointer ${currentPage === index ? 'border-l-4': ''}`} key={item.title}>
            {item.title}
          </p>
        ))
      }
    </nav>) :
    (
      <div className="absolute right-2 top-2" aria-label="菜单">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-9 h-9 focus:outline-none z-50"
        >
          <div className={`cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-8 h-0.5 bg-gray-200 mb-2"></div>
            <div className="w-8 h-0.5 bg-gray-200 mb-2"></div>
            <div className="w-8 h-0.5 bg-gray-200"></div>
          </div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
            }`}>
            <div className="w-6 h-0.5 bg-gray-200 transform rotate-45"></div>
            <div className="w-6 h-0.5 bg-gray-200 transform -rotate-45 -translate-y-0.5"></div>
          </div>
        </button>

        {isOpen &&
          (<div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-50 z-40">
            <div className="w-full">
              <nav className="pt-4 mr-4 pl-4 h-full flex flex-col">
                {
                  contentList.map((item, index) => (
                    <p onClick={() => handleMobileGo(index)} className="mb-8 text-gray-200 cursor-pointer" key={item.title}>
                      0{(index + 1) + '. ' + item.title}
                    </p>
                  ))
                }
              </nav>
            </div>
          </div>)
        }
      </div>
    )
  return showContent
}

export default SideNav
import { HeaderProps } from '@/type/chat'
import { Popover } from 'antd'

const Header: React.FC<HeaderProps> = ({ title, popContent, children }) => {
  return (
    <header className="h-14 bg-primary flex flex-row items-center">
      <Popover title={popContent} trigger="click">
        <h1 className="text-lg text-white text-500 mx-auto cursor-pointer">{title}</h1>
      </Popover>
      <div className="font-bold flex flex-row items-center justify-end mr-4">{children}</div>
    </header>
  )
}

export default Header

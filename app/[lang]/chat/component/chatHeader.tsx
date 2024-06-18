'use client'

import { Dropdown, Space, Tooltip } from "antd";
import { DownOutlined, ClearOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation"

interface chatHeaderProps {
  clearText: string
  backText: string
}

const modelItems: any = [
  {
    key: '0',
    label: '讯飞3.5'
  },
  {
    key: '1',
    label: '更多模型，敬请期待',
    disabled: true
  }
]

const chatHeader: React.FC<chatHeaderProps> = ({ clearText, backText }) => {

  const router = useRouter()

  const [menuValue, setMenuValue] = useState(modelItems[0].key)

  const clickModel = useCallback((e: any) => {
    e.preventDefault()
  }, [])

  const clickModelItem = useCallback(({ key }: any) => {
    setMenuValue(key)
  }, [])

  const backHome = useCallback(()=>{
    router.back()
  },[])

  return (
    <header className="relative flex flex-row items-center justify-center h-12 w-full">
      <Dropdown menu={{ items: modelItems, onClick: clickModelItem }} trigger={['click']} placement="bottom">
        <a onClick={clickModel} className="cursor-pointer">
          <Space className="mr-2">
            {modelItems.find((item: any) => item.key == menuValue)?.label || ''}
          </Space>
          <DownOutlined />
        </a>
      </Dropdown>
      <div className="absolute right-0">
        <Tooltip placement="bottom" arrow={false} title={clearText}>
          <ClearOutlined className="mr-4 cursor-pointer" />
        </Tooltip>
        <Tooltip placement="bottom" arrow={false} title={backText}>
          <ArrowLeftOutlined className="cursor-pointer" onClick={backHome}/>
        </Tooltip>
      </div>
    </header>
  )
}

export default chatHeader
'use client'

import { Dropdown, Space, Tooltip } from 'antd'
import { DownOutlined, ClearOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getModelList } from '@/constants/chat'
import { chatHeaderProps } from '@/type/chat'
import { useI18n } from '@/i18n'

const ChatHeader: React.FC<chatHeaderProps> = ({
  clearText,
  backText,
  handleClear,
  menuValue,
  handleClickModelItem,
}) => {
  const { dict } = useI18n()
  const modelList = getModelList(dict)
  const router = useRouter()

  const clickModel = useCallback((e: any) => {
    e.preventDefault()
  }, [])

  const backHome = useCallback(() => {
    router.replace('/chat')
  }, [router])

  return (
    <header className="relative flex flex-row items-center justify-center h-12 w-full">
      <Dropdown
        menu={{ items: modelList, onClick: handleClickModelItem }}
        trigger={['click']}
        placement="bottom"
      >
        <a onClick={clickModel} className="cursor-pointer">
          <Space className="mr-2">
            {modelList.find((item: any) => item.key == menuValue)?.label || ''}
          </Space>
          <DownOutlined />
        </a>
      </Dropdown>
      <div className="absolute right-0">
        <Tooltip placement="bottom" arrow={false} title={clearText}>
          <ClearOutlined className="mr-8 cursor-pointer" onClick={handleClear} />
        </Tooltip>
        <Tooltip placement="bottom" arrow={false} title={backText}>
          <ArrowLeftOutlined className="cursor-pointer" onClick={backHome} />
        </Tooltip>
      </div>
    </header>
  )
}

export default ChatHeader

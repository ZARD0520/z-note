import React from 'react'
import { Dropdown, Space } from 'antd'
import ZInput from '../../../../../components/common/z-input'
import { searchInputSuffixProps } from '@/type/chat'
import { InputComponentProps } from '@/type/common/component'

const suffixInput: React.FC<searchInputSuffixProps> = ({
  valueKey = '1',
  onSelect,
  onSearch,
  loading,
  dict,
}) => (
  <div className="flex items-center ml-2">
    <div>
      {onSelect && (
        <Dropdown
          menu={{ items: dict.roleList, onClick: onSelect }}
          trigger={['click']}
          placement="top"
        >
          <div className="cursor-pointer">
            <Space className="mr-2">
              {dict.chat.input.askTarget}
              {dict.roleList.find((item: any) => item.key === valueKey)?.label || ''}
            </Space>
          </div>
        </Dropdown>
      )}
    </div>
    <div
      className="ml-auto h-10 w-10 m-2 rounded-sm cursor-pointer hover:bg-primary-background flex items-center justify-center"
      onClick={onSearch}
    >
      {loading ? (
        <i className="iconfont icon-stop-circle text-primary-disabled"></i>
      ) : (
        <i className="iconfont icon-fasong text-primary-disabled"></i>
      )}
    </div>
  </div>
)

// 输入组件
const zSearchInput: React.FC<InputComponentProps> = ({
  type = 'text',
  rows,
  name,
  roleKey,
  placeholder = '',
  value = '',
  onChange,
  onSearch,
  onSelectRole,
  className = '',
  dict,
  isLoading,
  ...restProps
}) => {
  return (
    <ZInput
      type={type}
      rows={rows}
      onChange={onChange}
      value={value}
      isLoading={isLoading}
      onSearch={onSearch}
      placeholder={placeholder}
      dict={dict}
      suffix={() =>
        suffixInput({
          valueKey: roleKey || '',
          onSelect: onSelectRole,
          onSearch,
          loading: isLoading,
          dict,
        })
      }
      className={'border-2 border-primary-border ' + className}
      {...restProps}
    />
  )
}

export default zSearchInput

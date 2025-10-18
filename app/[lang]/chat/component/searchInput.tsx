import React from 'react';
import { Dropdown, Space } from "antd";
import ZInput from '../../../../components/common/z-input';
import { onSearchType, onSelectRoleType } from '@/type/chat';
import { InputComponentProps } from '@/type/common/component';
import { roleList } from '@/constants/chat';

const suffixInput = (valueKey: string = '1', onSelect?: onSelectRoleType, onSearch?: onSearchType) => (
  <div className='flex items-center ml-2'>
    <div>
      {onSelect && <Dropdown menu={{ items: roleList, onClick: onSelect }} trigger={['click']} placement="top">
        <div className='cursor-pointer'>
          <Space className="mr-2">
            提问对象：{roleList.find((item: any) => item.key === valueKey)?.label || ''}
          </Space>
        </div>
      </Dropdown>
      }
    </div>
    <div className="ml-auto h-10 w-10 m-2 rounded-sm cursor-pointer hover:bg-primary-background flex items-center justify-center" onClick={onSearch}>
      <i className="iconfont icon-fasong text-primary-disabled"></i>
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
  isLoading,
  ...restProps
}) => {
  return (
    <ZInput type={type} rows={rows} onChange={onChange} value={value} isLoading={isLoading} onSearch={onSearch} placeholder={placeholder} suffix={() => suffixInput(roleKey, onSelectRole, onSearch)} className={"border-2 border-primary-border " + className} {...restProps} />
  );
};

export default zSearchInput;
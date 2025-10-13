import React, { MouseEventHandler } from 'react';
import ZInput from './z-input';

// 定义Props类型接口
interface InputComponentProps {
  type: 'text' | 'email' | 'password' | 'number' | 'search';
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: MouseEventHandler<HTMLDivElement>;
  className?: string;
  isLoading?: boolean
}

const suffixInput = (
  <i className="iconfont icon-fasong text-primary-disabled"></i>
)

// 通用输入组件
const zSearchInput: React.FC<InputComponentProps> = ({
  type = 'text',
  name,
  placeholder = '',
  value = '',
  onChange,
  onSearch,
  className = '',
  isLoading,
  ...restProps
}) => {
  return (
    <ZInput type={type} onChange={onChange} value={value} isLoading={isLoading} onSearch={onSearch} placeholder={placeholder} suffix={suffixInput} className={"border-2 border-primary-border " + className} {...restProps} />
  );
};

export default zSearchInput;
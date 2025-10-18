import React, { MouseEventHandler } from 'react';

// 定义Props类型接口
interface InputComponentProps {
  type: 'text' | 'email' | 'password' | 'number' | 'search';
  rows?: number;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (e?: React.FormEvent) => void;
  className?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  isLoading?: boolean
}

// 通用输入组件
const zInput: React.FC<InputComponentProps> = ({
  type = 'text',
  rows = 1,
  name,
  placeholder = '',
  value = '',
  onChange,
  onSearch,
  className = '',
  prefix,
  suffix,
  isLoading,
  ...restProps
}) => {
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch && onSearch()
    }
  }
  return (
    <div className={`w-full h-10 flex flex-row items-center justify-center rounded-md ${className}`}>
      {prefix && <div>{prefix}</div>}
      {rows < 2 ? <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onKeyDown={handleEnter}
        onChange={onChange}
        className='flex-1 ml-2 mr-2 outline-none'
        {...restProps}
      /> : <textarea></textarea>}
      {suffix && <div onClick={onSearch} className='pl-4 pr-4 m-2 mr-0 h-full rounded-sm cursor-pointer hover:bg-primary-background flex items-center'>{suffix}</div>}
    </div>
  );
};

export default zInput;
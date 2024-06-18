import React, { MouseEventHandler } from 'react';

// 定义Props类型接口
interface InputComponentProps {
  type: 'text' | 'email' | 'password' | 'number' | 'search';
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: MouseEventHandler<HTMLDivElement>;
  className?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

// 通用输入组件
const zInput: React.FC<InputComponentProps> = ({
  type = 'text',
  name,
  placeholder = '',
  value = '',
  onChange,
  onSearch,
  className = '',
  prefix,
  suffix,
  ...restProps
}) => {
  return (
    <div className={`w-full h-10 flex flex-row items-center justify-center rounded-md ${className}`}>
      {prefix && <div>{prefix}</div>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='flex-1 ml-2 mr-2 outline-none'
        {...restProps}
      />
      {suffix && <div onClick={onSearch} className='pl-4 pr-4 m-2 mr-0 h-full rounded-sm cursor-pointer hover:bg-primary-background flex items-center'>{suffix}</div>}
    </div>
  );
};

export default zInput;
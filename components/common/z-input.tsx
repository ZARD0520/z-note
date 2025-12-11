import { InputComponentProps } from '@/type/common/component'
import React from 'react'

// 通用输入组件
const zInput: React.FC<InputComponentProps> = ({
  name,
  suffix,
  isLoading,
  rows = 2,
  placeholder = '',
  className = '',
  value = '',
  onChange,
  onSearch,
  ...restProps
}) => {
  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSearch && onSearch()
    }
  }
  return (
    <div
      className={`w-full min-h-28 max-h-40 overflow-y-scroll flex flex-col justify-center rounded-lg ${className}`}
    >
      <textarea
        rows={rows}
        className="flex-1 mt-2 ml-2 mr-2 outline-none resize-none"
        name={name}
        placeholder={placeholder}
        value={value}
        {...restProps}
        onKeyDown={handleEnter}
        onChange={onChange}
      ></textarea>
      {suffix && suffix(onSearch)}
    </div>
  )
}

export default zInput

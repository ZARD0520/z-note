import { TextareaHTMLAttributes } from "react";
import { onSearchType, onSelectRoleType } from "../chat";

// 输入框
export interface InputComponentProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  type: 'text' | 'email' | 'password' | 'number' | 'search';
  roleKey?: string
  onSearch?: onSearchType;
  onSelectRole?: onSelectRoleType
  className?: string;
  suffix?: (onSearch?: onSearchType) => React.ReactNode;
  isLoading?: boolean
}

// 下拉选择框
export interface SelectItem {
  label: string;
  key: number | string;
  icon?: React.ReactNode
  disabled?: boolean;
}

// Markdown
export interface MarkdownRenderProps {
  content: string;
  className?: string;
}
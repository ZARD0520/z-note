export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export type roleType = 'zard' | 'programmer' | 'cat'

export interface SelectItem {
  key: number | string;
  label: string;
  disabled?: boolean;
}
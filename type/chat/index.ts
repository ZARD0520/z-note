export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export type onSearchType = (e?: React.FormEvent) => void

export type onSelectRoleType = ({ key }: { key: string; }) => void
export interface ChatState {
  input: string
}

export interface ChatActions {
  setInput: (input: string) => void
}
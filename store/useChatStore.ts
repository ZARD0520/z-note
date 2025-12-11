import { STORAGE_KEYS } from '@/constants/store'
import { ChatActions, ChatState } from '@/type/store/chat'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialState: ChatState = {
  input: '',
}

export const useChatStore = create<ChatState & ChatActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      setInput: (input: string) => {
        set({ input })
      },
    }),
    {
      name: STORAGE_KEYS.CHAT_STORE,
      partialize: (state) => ({
        input: state.input,
      }),
    }
  )
)

export const useChatInput = () => useChatStore((state) => state.input)

export const useChatActions = () =>
  useChatStore((state) => ({
    setInput: state.setInput,
  }))

'use client'

import { useRouter } from "next/navigation"

export const FloatingBackButton = () => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.replace('/wezard')}
      className="fixed top-4 left-4 z-50 bg-slate-600 bg-opacity-50 text-white px-3 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </button>
  )
}
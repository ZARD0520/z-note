'use client'

import React from 'react'

export const MonitorContext = React.createContext<{ mt: any } | null>(null)

export function useMonitor() {
  const ctx = React.useContext(MonitorContext)
  return ctx?.mt ?? null
}

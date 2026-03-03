'use client'

import createMonitor from '../../lib/monitor'
import React from 'react'
import { usePathname } from 'next/navigation'
import { MonitorContext } from './context'
import MonitorTestPanel from './MonitorTestPanel'

export default function ClientSideMonitor({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { mt, MonitorWrapper } = createMonitor(
    React,
    { pathname },
    {
      url: process.env.NEXT_PUBLIC_SERVER_URL,
      platform: 'react',
      key: 'z-app',
      trackList: ['ajax', 'userInfo'],
    },
    {
      ajax: {
        excludeUrls: [
          'http://localhost:8001/api/monitor/add',
          'http://43.136.119.247/api/monitor/add',
        ],
      },
      userInfo: {
        getData: () => ({
          userId: 'test-user-001',
          userName: '测试用户',
          env: process.env.NODE_ENV,
        }),
      },
    }
  )

  return (
    <MonitorContext.Provider value={{ mt }}>
      <MonitorWrapper>
        {children}
        <MonitorTestPanel />
      </MonitorWrapper>
    </MonitorContext.Provider>
  )
}

export { useMonitor } from './context'

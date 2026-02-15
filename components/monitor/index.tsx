'use client'

import createMonitor from '../../lib/monitor'
import React from 'react'
import { usePathname } from 'next/navigation'

export default function ClientSideMonitor() {
  const pathname = usePathname()
  createMonitor(
    React,
    { pathname },
    {
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
        getData: null,
      },
    }
  )
  return null
}

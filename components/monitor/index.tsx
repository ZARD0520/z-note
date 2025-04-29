'use client';

import createMonitor from '../../lib/monitor';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

export default function ClientSideMonitor() {
  useEffect(() => {
    createMonitor(React, { useRouter, usePathname }, {
      platform: 'react',
      key: 'z-app',
      trackList: ['ajax', 'userInfo']
    }, {
      ajax: {
        excludeUrls: ['http://localhost:8001/api/monitor/add']
      },
      userInfo: {
        getData: null
      }
    })
    // const m = new Monitor()
    // return () => m.destory()
  })
  return null;
}
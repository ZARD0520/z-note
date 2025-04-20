'use client';

import createMonitor from '../../lib/monitor';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

export default function ClientSideMonitor() {
  useEffect(() => {
    createMonitor(React, { useRouter, usePathname }, {}, {})
    // const m = new Monitor()
    // return () => m.destory()
  })
  return null;
}
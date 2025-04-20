'use client';

import Monitor from '../../lib/monitor';
import { useEffect } from 'react';

export default function ClientSideMonitor() {
  useEffect(() => {
    const m = new Monitor({})
    return () => m.destory()
  })
  return null;
}
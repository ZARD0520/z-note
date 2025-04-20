'use client';

import createMonitor from '../../lib/monitor';
import React, { useEffect } from 'react';

export default function ClientSideMonitor() {
  useEffect(() => {
    createMonitor(React, { useHistory, useLocation })
    // const m = new Monitor()
    // return () => m.destory()
  })
  return null;
}
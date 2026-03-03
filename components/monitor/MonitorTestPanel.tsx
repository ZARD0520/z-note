'use client'

/**
 * 浮动测试面板 - 在已有页面上测试跨页面手动埋点、错误采集、用户信息采集
 */
import React from 'react'
import { usePathname } from 'next/navigation'
import { useMonitor } from './context'

export default function MonitorTestPanel() {
  const mt = useMonitor()
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const handleManualTrack = () => {
    if (!mt) return
    mt.count?.('cross_page_manual_track', { page: pathname, source: 'test_panel' })
    mt.send({
      type: mt.TYPES?.CUSTOM,
      level: mt.LEVELS?.INFO,
      data: { event: 'manual_track', page: pathname, timestamp: Date.now() },
    })
    console.log('[Monitor] 手动埋点已发送, 当前页:', pathname)
  }

  const handleTriggerSyncError = () => {
    throw new Error(`[Monitor] 测试同步错误 - 页面: ${pathname}`)
  }

  const handleTriggerAsyncError = () => {
    Promise.reject(new Error(`[Monitor] 测试异步错误 - 页面: ${pathname}`))
    console.log('[Monitor] 已触发 Promise 错误')
  }

  const handleSendUserInfo = async () => {
    if (!mt?.plugins?.userInfo) {
      console.warn('[Monitor] userInfo 插件未注册')
      return
    }
    try {
      const userData = await mt.plugins.userInfo.getUserInfo()
      if (userData) {
        mt.send({
          type: mt.TYPES?.USERINFO,
          level: mt.LEVELS?.INFO,
          data: userData,
        })
        console.log('[Monitor] 用户信息已上报:', userData)
      }
    } catch (e) {
      console.error('[Monitor] 用户信息采集失败:', e)
    }
  }

  // 仅在客户端挂载后渲染，避免 SSR 与客户端 DOM 不一致导致 hydration 错误
  if (!mounted || !mt) return null

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-slate-700 text-white shadow-lg hover:bg-slate-600"
        title="埋点测试"
      >
        {open ? '×' : '📊'}
      </button>
      {open && (
        <div className="absolute bottom-12 right-0 w-56 p-3 rounded-lg bg-slate-800 border border-slate-600 shadow-xl text-sm">
          <div className="text-slate-400 text-xs mb-2">当前: {pathname}</div>
          <div className="space-y-1">
            <button
              onClick={handleManualTrack}
              className="block w-full py-1.5 px-2 text-left rounded bg-green-700/50 hover:bg-green-600/50"
            >
              手动埋点
            </button>
            <button
              onClick={handleTriggerSyncError}
              className="block w-full py-1.5 px-2 text-left rounded bg-amber-700/50 hover:bg-amber-600/50"
            >
              同步错误
            </button>
            <button
              onClick={handleTriggerAsyncError}
              className="block w-full py-1.5 px-2 text-left rounded bg-amber-700/50 hover:bg-amber-600/50"
            >
              Promise 错误
            </button>
            <button
              onClick={handleSendUserInfo}
              className="block w-full py-1.5 px-2 text-left rounded bg-blue-700/50 hover:bg-blue-600/50"
            >
              用户信息
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

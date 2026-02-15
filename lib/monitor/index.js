/**
 * z-monitor 入口
 * 兼容 SSR：仅在客户端初始化，服务端返回空实现
 */
import useMonitor from './react/src/index.jsx'

// createMonitor 为 useMonitor 的别名，供非 hook 场景使用（如 useEffect 内初始化）
export default useMonitor
export { useMonitor }

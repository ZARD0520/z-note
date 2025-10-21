import { UseWindowSizeType } from "@/type/common/hooks";
import { useEffect, useState } from "react";

export const defaultBreakpoints: UseWindowSizeType.breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export function useWindowSize(options: UseWindowSizeType.useWindowSizeOptions = {}): UseWindowSizeType.useWindowSizeReturn {
  const { breakpoints = defaultBreakpoints } = options;
  
  const [windowSize, setWindowSize] = useState<UseWindowSizeType.windowSize>(() => {
    // 服务端渲染时的默认值
    if (typeof window === 'undefined') {
      return {
        width: 1024,
        height: 768
      };
    }
    
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // 立即执行一次获取初始尺寸
    handleResize();

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 计算当前断点
  const getBreakpoint = (width: number): UseWindowSizeType.useWindowSizeReturn['breakpoint'] => {
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    return 'sm';
  };

  const breakpoint = getBreakpoint(windowSize.width);

  return {
    width: windowSize.width,
    height: windowSize.height,
    breakpoint,
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2Xl: breakpoint === '2xl',
    isMobile: windowSize.width < breakpoints.md, // < 768px 认为是移动端
    isDesktop: windowSize.width >= breakpoints.md // >= 768px 认为是桌面端
  };
}
import { RefObject } from "react"

export namespace UsePressType {
  interface usePressOptions {
    duration?: number
    onStart?: () => void
    onEnd?: () => void
  }
  export interface usePressParams {
    onPress: () => void
    options: usePressOptions
  }
}

export namespace UseScrollType {
  export interface useScrollProps {
    totalPages: number;
    initialPage?: number;
    scrollThreshold?: number;
    swipeThreshold?: number;
    enableKeyboard?: boolean;
    enableWheel?: boolean;
    enableSwipe?: boolean;
    throttleDelay?: number;
  }
  export interface useScrollReturn {
    currentPage: number;
    direction: number;
    goToNextPage: () => void;
    goToPrevPage: () => void;
    goToPage: (page: number) => void;
    isFirstPage: boolean;
    isLastPage: boolean;
    progress: number;
  }
  export interface touchPosition {
    x: number;
    y: number;
    time: number;
  }
}

export namespace UseWindowSizeType {
  export type breakpointType = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  export interface windowSize {
    width: number;
    height: number;
  }

  export interface breakpoints {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
  }

  export interface useWindowSizeOptions {
    breakpoints?: breakpoints;
  }

  export interface useWindowSizeReturn {
    width: number;
    height: number;
    breakpoint: breakpointType;
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
    isXl: boolean;
    is2Xl: boolean;
    isMobile: boolean;
    isDesktop: boolean;
  }
}

export namespace UseInfiniteScroll {
  export interface UseInfiniteScrollProps {
    onLoadMore: () => void;
    hasMore: boolean;
    threshold?: number;
  }
}

export namespace UseVirtualScroll {
  export interface UseVirtualScrollProps<T> {
    items: T[];
    itemHeight: number;
    containerHeight: number;
    overscan?: number;
  }
  export interface UseVirtualScrollReturn<T> {
    visibleItems: Array<{ data: T; index: number; offset: number }>;
    totalHeight: number;
    handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  }
}

export namespace UseWaterfallFlow {
  export interface WaterfallItem {
    id: string | number;
    estimatedHeight: number;
    actualHeight?: number;
    [key: string]: any;
  }
  
  export interface WaterfallOptions {
    minColumnWidth?: number;
    gap?: number;
    responsive?: boolean;
    lazyLoad?: boolean;
    debounceWait?: number;
  }
  
  export interface WaterfallReturn {
    columns: number;
    columnData: WaterfallItem[][];
    containerRef: RefObject<HTMLDivElement>;
    observeElement: (element: Element | null, itemId: string | number) => void;
    isItemVisible: (itemId: string | number) => boolean;
    recalculateLayout: () => void;
  }
}
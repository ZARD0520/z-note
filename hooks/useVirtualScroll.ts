import { UseVirtualScroll } from "@/type/common/hooks";
import { useCallback, useMemo, useState } from "react";

const useVirtualScroll = <T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5
}: UseVirtualScroll.UseVirtualScrollProps<T>): UseVirtualScroll.UseVirtualScrollReturn<T> => {
  const [scrollTop, setScrollTop] = useState<number>(0);

  const visibleItems = useMemo(() => {
    if (items.length === 0) return [];

    const startIndex = Math.floor(scrollTop / itemHeight);
    const visibleItemCount = Math.ceil(containerHeight / itemHeight);
    const endIndex = Math.min(
      startIndex + visibleItemCount + overscan * 2,
      items.length
    );

    const startIndexWithBuffer = Math.max(0, startIndex - overscan);
    
    return items
      .slice(startIndexWithBuffer, endIndex)
      .map((item, index) => ({
        data: item,
        index: startIndexWithBuffer + index,
        offset: (startIndexWithBuffer + index) * itemHeight
      }));
  }, [items, scrollTop, itemHeight, containerHeight, overscan]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>): void => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const totalHeight = items.length * itemHeight;

  return {
    visibleItems,
    totalHeight,
    handleScroll
  };
};

export default useVirtualScroll
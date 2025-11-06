import { UseWaterfallFlow } from '@/type/common/hooks';
import { throttle } from '@/utils/utils';
import { useState, useEffect, useRef, useCallback } from 'react';

const useWaterfallFlow = <T extends UseWaterfallFlow.BaseWaterfallItem>(
  data: T[],
  options: UseWaterfallFlow.WaterfallOptions = {}
) => {
  const { minColumnWidth = 280, gap = 16, responsive = true } = options;

  const [columns, setColumns] = useState(1);
  const [columnData, setColumnData] = useState<T[][]>([]);
  const [itemHeights, setItemHeights] = useState<Map<string | number, number>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // 计算列数
  const calculateColumns = useCallback(() => {
    if (!containerRef.current) return 1;
    const containerWidth = containerRef.current.offsetWidth;
    return Math.max(1, Math.floor(containerWidth / minColumnWidth));
  }, [minColumnWidth]);

  // 响应式处理
  useEffect(() => {
    if (!responsive) return;

    const handleResize = () => {
      const newColumns = calculateColumns();
      setColumns(newColumns);
    };

    const debouncedResize = throttle(handleResize, 250);
    handleResize();
    
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, [responsive, calculateColumns]);

  // 分配数据到列
  useEffect(() => {
    if (data.length === 0 || columns === 0) {
      setColumnData([]);
      return;
    }

    const newColumnData: T[][] = Array.from({ length: columns }, () => []);
    const columnHeights: number[] = Array(columns).fill(0);

    data.forEach(item => {
      // 找到高度最小的列
      const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
      newColumnData[minHeightIndex].push(item);
      
      // 使用已知高度或默认高度
      const itemHeight = itemHeights.get(item.id) || 400;
      columnHeights[minHeightIndex] += itemHeight + gap;
    });

    setColumnData(newColumnData);
  }, [data, columns, itemHeights, gap]);

  // 注册项目高度
  const registerItemHeight = useCallback((itemId: string | number, height: number) => {
    setItemHeights(prev => {
      const newHeights = new Map(prev);
      if (newHeights.get(itemId) !== height) {
        newHeights.set(itemId, height);
        return newHeights;
      }
      return prev;
    });
  }, []);

  const columnWidth = containerRef.current ? 
    (containerRef.current.offsetWidth - gap * (columns - 1)) / columns : minColumnWidth;

  return {
    columns,
    columnData,
    containerRef,
    columnWidth,
    registerItemHeight
  };
};

export default useWaterfallFlow;
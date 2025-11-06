import { UseWaterfallFlow } from '@/type/common/hooks';
import { useState, useEffect, useRef, useCallback, RefObject } from 'react';

// 类型定义

const useWaterfallFlow = (
  data: UseWaterfallFlow.WaterfallItem[],
  options: UseWaterfallFlow.WaterfallOptions = {}
): UseWaterfallFlow.WaterfallReturn => {
  const {
    minColumnWidth = 300,
    gap = 20,
    responsive = true,
    lazyLoad = true,
    debounceWait = 250
  } = options;

  const [columns, setColumns] = useState<number>(1);
  const [columnData, setColumnData] = useState<UseWaterfallFlow.WaterfallItem[][]>([]);
  const [visibleItems, setVisibleItems] = useState<Set<string | number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 防抖函数
  const debounce = useCallback(<T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }, []);

  // 计算列数
  const calculateColumns = useCallback((): number => {
    if (!containerRef.current) return 1;
    
    const containerWidth = containerRef.current.offsetWidth;
    const calculatedColumns = Math.max(
      1, 
      Math.floor((containerWidth + gap) / (minColumnWidth + gap))
    );
    setColumns(calculatedColumns);
    return calculatedColumns;
  }, [minColumnWidth, gap]);

  // 分配数据到各列
  const distributeData = useCallback((
    data: UseWaterfallFlow.WaterfallItem[], 
    columns: number
  ): UseWaterfallFlow.WaterfallItem[][] => {
    if (!data || data.length === 0 || columns === 0) {
      return [];
    }

    const newColumnData: UseWaterfallFlow.WaterfallItem[][] = Array.from({ length: columns }, () => []);
    const columnHeights: number[] = Array(columns).fill(0);

    data.forEach(item => {
      const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
      newColumnData[minHeightIndex].push(item);
      columnHeights[minHeightIndex] += item.actualHeight || item.estimatedHeight;
    });

    return newColumnData;
  }, []);

  // 初始化懒加载观察器
  useEffect(() => {
    if (!lazyLoad) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const itemId = entry.target.getAttribute('data-id');
            if (itemId) {
              setVisibleItems(prev => {
                const newSet = new Set(prev);
                // 处理数字和字符串ID
                const id = isNaN(Number(itemId)) ? itemId : Number(itemId);
                newSet.add(id);
                return newSet;
              });
              observerRef.current?.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin: '100px 0px' }
    );

    return () => observerRef.current?.disconnect();
  }, [lazyLoad]);

  // 响应式列数计算
  useEffect(() => {
    if (!responsive) return;

    const handleResize = debounce(() => {
      calculateColumns();
    }, debounceWait);

    // 初始计算
    calculateColumns();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [responsive, calculateColumns, debounce, debounceWait]);

  // 数据分配到列
  useEffect(() => {
    const distributedData = distributeData(data, columns);
    setColumnData(distributedData);
  }, [data, columns, distributeData]);

  // 观察元素实现懒加载
  const observeElement = useCallback((element: Element | null, itemId: string | number) => {
    if (!lazyLoad || !observerRef.current || !element) return;
    
    observerRef.current.observe(element);
  }, [lazyLoad]);

  // 判断元素是否可见
  const isItemVisible = useCallback((itemId: string | number): boolean => {
    return visibleItems.has(itemId);
  }, [visibleItems]);

  // 重新计算布局
  const recalculateLayout = useCallback(() => {
    const newColumns = calculateColumns();
    const newColumnData = distributeData(data, newColumns);
    setColumnData(newColumnData);
  }, [data, calculateColumns, distributeData]);

  return {
    columns,
    columnData,
    containerRef,
    observeElement,
    isItemVisible,
    recalculateLayout
  };
};

export default useWaterfallFlow;
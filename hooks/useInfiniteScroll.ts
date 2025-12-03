import { UseInfiniteScroll } from "@/type/common/hooks";
import { useCallback, useEffect, useRef, useState } from "react";

const useInfiniteScroll = ({ onLoadMore, hasMore, threshold = 100, retryCount = 3 }: UseInfiniteScroll.UseInfiniteScrollProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failCount, setFailCount] = useState(0)
  const observerRef = useRef<IntersectionObserver>();
  const elementRef = useRef<Element | null>(null);

  const handleLoadMore = useCallback(async () => {
    if (loading || !hasMore || failCount >= retryCount) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await onLoadMore();
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载失败');
      setFailCount(failCount + 1)
      console.error('无限滚动加载错误:', err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, failCount, retryCount, onLoadMore]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasMore && !loading) {
      handleLoadMore();
    }
  }, [handleLoadMore, hasMore, loading]);

  const triggerRef = useCallback((node: Element | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    elementRef.current = node;

    if (node) {
      const options = {
        root: null,
        rootMargin: `0px 0px ${threshold}px 0px`,
        threshold: 0,
      };

      observerRef.current = new IntersectionObserver(handleObserver, options);
      observerRef.current.observe(node);
    }
  }, [handleObserver, threshold]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setFailCount(0);
  }, []);

  return {
    loading,
    error,
    reset,
    triggerRef,
  };
}

export default useInfiniteScroll
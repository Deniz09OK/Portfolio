import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (callback: IntersectionObserverCallback, options = {}) => {
  const targetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      ...options,
    });

    const current = targetRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [callback, options]);

  return targetRef;
};
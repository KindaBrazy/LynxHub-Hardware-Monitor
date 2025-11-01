import {useCallback, useEffect, useRef, useState} from 'react';

/**
 * A hook to manage the scrolling state and behavior of a container element.
 * @returns Functions and state to manage scrolling, including refs and scroll button visibility.
 */
export default function useScrollManager<T extends HTMLElement>() {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const ref = useRef<T | null>(null);

  const updateScrollState = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    const {scrollLeft, scrollWidth, clientWidth} = element;
    setCanScrollLeft(scrollLeft > 0);
    // Use a small buffer to account for sub-pixel rendering issues
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  const scroll = useCallback((direction: 'left' | 'right') => {
    ref.current?.scrollBy({
      left: direction === 'left' ? -250 : 250,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Update scroll state on resize and scroll events
    const handleResize = () => updateScrollState();
    window.addEventListener('resize', handleResize);
    element.addEventListener('scroll', updateScrollState);

    // Initial check
    updateScrollState();

    return () => {
      window.removeEventListener('resize', handleResize);
      element.removeEventListener('scroll', updateScrollState);
    };
  }, [updateScrollState]);

  // Handle horizontal scrolling via vertical mouse wheel
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return;
      // Prevent default vertical scroll and scroll horizontally instead
      event.preventDefault();
      element.scrollLeft += event.deltaY;
    };

    element.addEventListener('wheel', handleWheel, {passive: false});
    return () => element.removeEventListener('wheel', handleWheel);
  }, []);

  const containerRef = useCallback(
    (node: T | null) => {
      if (node) {
        ref.current = node;
        updateScrollState(); // Re-check when the element is attached
      }
    },
    [updateScrollState],
  );

  return {containerRef, canScrollLeft, canScrollRight, scroll};
}

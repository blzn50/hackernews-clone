import React, { useState, useRef, useEffect } from 'react';

const useIntersect = ({ rootMargin = '0px', threshold = 0.15 }) => {
  const [entry, setEntry] = useState({});
  const [node, setNode] = useState(null);

  const observer = useRef(null);

  useEffect(() => {
    observer.current = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].boundingClientRect.y !== 0) {
          setEntry(entries[0]);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );
    const { current: currentObserver } = observer;
    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, rootMargin, threshold]);

  return [setNode, entry];
};

export default useIntersect;

import React, { useState, useRef, useEffect } from 'react';

const useIntersect = ({ root = null, rootMargin = '0px', threshold = 1 }) => {
  const [entry, setEntry] = useState({});
  const [node, setNode] = useState(null);

  const observer = useRef(
    new window.IntersectionObserver(
      (entries) => {
        setEntry(entries[0]);
      },
      {
        root,
        rootMargin,
        threshold,
      }
    )
  );

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node]);

  return [setNode, entry];
};

export default useIntersect;
import React, { useState, useRef, useEffect } from 'react';

const useIntersect = ({ root = null, rootMargin = '0px', threshold = 1 }) => {
  const [entry, setEntry] = useState({});
  const [node, setNode] = useState(null);
  const [endOfContents, setEndOfContents] = useState(false);

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

    if (node) currentObserver.observe(node);

    return () => {
      if (endOfContents) {
        currentObserver.disconnect();
      }
    };
  }, [node, endOfContents]);

  return [setNode, entry, setEndOfContents];
};

export default useIntersect;

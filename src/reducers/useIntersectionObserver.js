import React, { useState, useRef, useEffect } from 'react';

/* 
const callback = () => {

}

const observer = new IntersectionObserver(callback, options)

observer.observer(nodeOne); //observing only nodeOne
observer.observer(nodeTwo); //observing both nodeOne and nodeTwo
observer.unobserve(nodeOne); //observing only nodeTwo
observer.disconnect(); //not observing any node 
*/

export const useIntersect = ({ root = null, rootMargin = '0px', threshold = 0.3 }) => {
  const [entry, setEntry] = useState({});
  const [node, setNode] = useState(null);

  const observer = useRef(
    new window.IntersectionObserver(([entry]) => setEntry(entry), {
      root,
      rootMargin,
      threshold,
    })
  );

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();

    if (node) currentObserver.observe(node.current);

    return () => currentObserver.disconnect();
  }, [node]);

  return [setNode, entry];
};

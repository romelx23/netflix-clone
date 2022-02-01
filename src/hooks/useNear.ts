import { RefObject, useEffect, useMemo, useState } from "react";

interface Options{
    root: null,
    rootMargin: "0px",
    threshold: number,
}

export const useIntersection = (options:Options, targetRef:RefObject<HTMLElement>) => {
  const [visible, setVisible] = useState(false);
  const optionsMemo = useMemo(() => {
    return options;
  }, [options]);
  const nextPublication = (entries:IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setVisible(entry.isIntersecting);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(nextPublication, optionsMemo);
    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [targetRef, options]);
  return visible;
};
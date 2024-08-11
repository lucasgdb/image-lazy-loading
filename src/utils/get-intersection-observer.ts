import type { ObservableSkeletonElement } from "../types";

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target as ObservableSkeletonElement;
      target.onIntersection();
    }
  });
};

const LAZY_LOAD_OBSERVERS: { [key: string]: IntersectionObserver } = {};

type getObserverProps = {
  rootMargin?: string;
  threshold?: number | number[];
};

export function getIntersectionObserver({
  rootMargin,
  threshold,
}: getObserverProps) {
  LAZY_LOAD_OBSERVERS[`${rootMargin},${threshold}`] ??=
    new IntersectionObserver(handleIntersection, { rootMargin, threshold });

  return LAZY_LOAD_OBSERVERS[`${rootMargin},${threshold}`];
}

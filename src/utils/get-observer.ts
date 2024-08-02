import type { HTMLDivElementExtended } from "../types";

const checkIntersections = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target as HTMLDivElementExtended;
      target.onShowImage?.();
    }
  });
};

const LAZY_LOAD_OBSERVERS: { [key: string]: IntersectionObserver } = {};

type getObserverProps = {
  rootMargin?: string;
  threshold?: number | number[];
};

export function getObserver({ rootMargin, threshold }: getObserverProps) {
  if (LAZY_LOAD_OBSERVERS[`${rootMargin},${threshold}`]) {
    return LAZY_LOAD_OBSERVERS[`${rootMargin},${threshold}`];
  }

  LAZY_LOAD_OBSERVERS[`${rootMargin},${threshold}`] = new IntersectionObserver(
    checkIntersections,
    { rootMargin, threshold }
  );

  return LAZY_LOAD_OBSERVERS[`${rootMargin},${threshold}`];
}

import { useEffect, useRef } from "react";
import { getIntersectionObserver } from "../utils/get-intersection-observer";
import { Skeleton } from "./Skeleton";
import { ObservableSkeletonElement } from "../types";

type Props = {
  width: number | string;
  height: number | string;
  threshold?: number;
  rootMargin?: string;
  onIntersection: () => void;
};

export function ObservableSkeleton({
  width,
  height,
  threshold,
  rootMargin,
  onIntersection,
}: Props) {
  const loaderRef = useRef<ObservableSkeletonElement>(null);

  // IntersectionObserver - observes skeleton and when it is intersected, it loads the image src
  useEffect(() => {
    const intersectionObserver = getIntersectionObserver({
      threshold,
      rootMargin,
    });

    if (loaderRef.current) {
      loaderRef.current.onIntersection = () => {
        onIntersection();

        if (loaderRef.current)
          intersectionObserver.unobserve(loaderRef.current);
      };

      intersectionObserver.observe(loaderRef.current);
    }

    const current = loaderRef.current;

    return () => {
      if (current) intersectionObserver.unobserve(current);
    };
  }, []);

  return <Skeleton width={width} height={height} ref={loaderRef} />;
}

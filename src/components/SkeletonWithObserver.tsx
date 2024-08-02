import { useEffect, useRef } from "react";
import { getObserver } from "../utils/get-observer";
import { Skeleton } from "./Skeleton";
import { HTMLDivElementExtended } from "../types";

type Props = {
  width: number | string;
  height: number | string;
  threshold?: number;
  rootMargin?: string;
  onIntersected: () => void;
};

export function SkeletonWithObserver({
  width,
  height,
  threshold,
  rootMargin,
  onIntersected,
}: Props) {
  const loaderRef = useRef<HTMLDivElementExtended>(null);

  // IntersectionObserver - observes skeleton and when it is intersected, it loads the image src
  useEffect(() => {
    const intersectionObserver = getObserver({
      threshold,
      rootMargin,
    });

    if (loaderRef.current) {
      loaderRef.current.onIntersected = () => {
        onIntersected();

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

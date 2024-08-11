import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { getIntersectionObserver } from "../../utils/get-intersection-observer";
import { ObservableSkeletonElement } from "../../types";
import { cx } from "../../utils/cx";

type Props = ComponentPropsWithoutRef<"span"> & {
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
  className,
  onIntersection,
  ...props
}: Props) {
  const loaderRef = useRef<ObservableSkeletonElement>(null);

  // IntersectionObserver - Observes the skeleton, and when an intersection is detected, it loads the image source
  useEffect(() => {
    const intersectionObserver = getIntersectionObserver({
      threshold,
      rootMargin,
    });

    const current = loaderRef.current;
    if (current) {
      current.onIntersection = () => {
        onIntersection();

        if (current) {
          intersectionObserver.unobserve(current);
        }
      };

      intersectionObserver.observe(current);
    }

    return () => {
      if (current) {
        intersectionObserver.unobserve(current);
      }
    };
  }, []);

  const getSize = (size: string | number) => {
    return typeof size === "string" ? size : `${size}px`;
  };

  return (
    <span
      {...props}
      ref={loaderRef}
      style={{ width: getSize(width), height: getSize(height) }}
      className={cx(
        "inline-block animate-pulse bg-gray-200 rounded-full",
        className
      )}
    />
  );
}

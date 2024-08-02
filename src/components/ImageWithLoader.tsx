import { useEffect, useRef, useState } from "react";
import { Skeleton } from "./Skeleton";
import { HTMLDivElementExtended } from "../types";
import { getObserver } from "../utils/get-observer";
import { Image } from "./Image";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  width: number | string;
  height: number | string;
  threshold?: number;
  rootMargin?: string;
};

export function ImageWithLoader({
  threshold = 0.5,
  rootMargin,
  ...props
}: Props) {
  const [hidden, setHidden] = useState(true);
  const [shouldShowImage, setShouldShowImage] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElementExtended>(null);

  useEffect(() => {
    const intersectionObserver = getObserver({
      threshold,
      rootMargin,
    });

    if (containerRef.current) {
      containerRef.current.onShowImage = () => {
        setShouldShowImage(true);
        if (containerRef.current)
          intersectionObserver.unobserve(containerRef.current);
      };

      intersectionObserver.observe(containerRef.current);
    }

    const current = containerRef.current;

    return () => {
      if (current) intersectionObserver.unobserve(current);
    };
  }, [containerRef]);

  useEffect(() => {
    const MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;

    const handleChangeAvatar = () => setHidden(true);

    const mutationObserver = new MutationObserver(handleChangeAvatar);

    if (imgRef.current) {
      mutationObserver.observe(imgRef.current, {
        attributes: true,
        attributeFilter: ["src"],
      });
    }

    const current = imgRef.current;

    return () => {
      if (current) mutationObserver.disconnect();
    };
  }, [imgRef]);

  const handleLoad = () => setHidden(false);

  return (
    <>
      {hidden && (
        <Skeleton
          width={props.width}
          height={props.height}
          ref={containerRef}
        />
      )}

      {shouldShowImage && (
        <Image onLoad={handleLoad} ref={imgRef} hidden={hidden} {...props} />
      )}
    </>
  );
}

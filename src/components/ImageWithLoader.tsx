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
  src,
  ...props
}: Props) {
  const [loadingImage, setLoadingImage] = useState(true);
  const [shouldRenderImage, setShouldRenderImage] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElementExtended>(null);

  // IntersectionObserver - observes skeleton and when it is intersected, it loads the image src
  useEffect(() => {
    const intersectionObserver = getObserver({
      threshold,
      rootMargin,
    });

    if (containerRef.current) {
      containerRef.current.onShowImage = () => {
        setShouldRenderImage(true);
        if (containerRef.current)
          intersectionObserver.unobserve(containerRef.current);
      };

      intersectionObserver.observe(containerRef.current);
    }

    const current = containerRef.current;

    return () => {
      if (current) intersectionObserver.unobserve(current);
    };
  }, [shouldRenderImage]);

  // MutatioObserver - observes image's src and when it changes, the skeleton will be back
  useEffect(() => {
    const MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;

    const handleChangeAvatar = (entries: MutationRecord[]) => {
      entries.forEach((entry) => {
        if (entry.type === "attributes") {
          setLoadingImage(true);
          setShouldRenderImage(false);
        }
      });
    };

    const mutationObserver = new MutationObserver(handleChangeAvatar);

    if (imgRef.current && !loadingImage) {
      mutationObserver.observe(imgRef.current, {
        attributes: true,
        attributeFilter: ["src"],
      });
    }

    const current = imgRef.current;

    return () => {
      if (current) mutationObserver.disconnect();
    };
  }, [loadingImage]);

  const handleLoad = () => setLoadingImage(false);

  const source = shouldRenderImage ? src : undefined;

  return (
    <>
      {loadingImage && (
        <Skeleton
          width={props.width}
          height={props.height}
          ref={containerRef}
        />
      )}

      <Image
        onLoad={handleLoad}
        ref={imgRef}
        hidden={loadingImage}
        src={source}
        {...props}
      />
    </>
  );
}

import { memo, useState } from "react";
import { SkeletonWithObserver } from "./SkeletonWithObserver";
import { ImageWithObserver } from "./ImageWithObserver";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  width: number | string;
  height: number | string;
  threshold?: number;
  rootMargin?: string;
};

export const LazyImage = memo(
  ({ threshold = 0.5, rootMargin, src, ...props }: Props) => {
    const [loadingImage, setLoadingImage] = useState(true);
    const [shouldRenderImage, setShouldRenderImage] = useState(false);

    const handleLoad = () => setLoadingImage(false);

    const handleIntersection = () => setShouldRenderImage(true);

    const handleMutation = () => {
      setLoadingImage(true);
      setShouldRenderImage(false);
    };

    const source = shouldRenderImage ? src : undefined;

    return (
      <>
        {loadingImage && (
          <SkeletonWithObserver
            width={props.width}
            height={props.height}
            threshold={threshold}
            rootMargin={rootMargin}
            onIntersection={handleIntersection}
          />
        )}

        <ImageWithObserver
          isObservable={!loadingImage}
          onLoad={handleLoad}
          src={source}
          onMutation={handleMutation}
          {...props}
        />
      </>
    );
  }
);

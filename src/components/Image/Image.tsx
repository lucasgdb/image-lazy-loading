import { ComponentPropsWithoutRef, memo, useCallback, useState } from "react";
import { ObservableSkeleton } from "./ObservableSkeleton";
import { ObservableImage } from "./ObservableImage";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  width: number | string;
  height: number | string;
  threshold?: number;
  rootMargin?: string;
  skeletonProps?: ComponentPropsWithoutRef<"span">;
};

export const Image = memo(
  ({ threshold = 0.5, rootMargin, src, skeletonProps, ...props }: Props) => {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [shouldRenderImage, setShouldRenderImage] = useState(false);

    const handleImageLoaded = () => setIsImageLoading(false);

    const handleImageIntersected = useCallback(() => {
      setShouldRenderImage(true);
    }, []);

    const handleImageChange = useCallback(() => {
      setIsImageLoading(true);
      setShouldRenderImage(false);
    }, []);

    const source = shouldRenderImage ? src : undefined;

    const isImageLoaded = !isImageLoading;

    return (
      <>
        {isImageLoading && (
          <ObservableSkeleton
            width={props.width}
            height={props.height}
            threshold={threshold}
            rootMargin={rootMargin}
            onIntersection={handleImageIntersected}
            {...skeletonProps}
          />
        )}

        <ObservableImage
          src={source}
          isObservable={isImageLoaded}
          onLoad={handleImageLoaded}
          onMutation={handleImageChange}
          {...props}
        />
      </>
    );
  }
);

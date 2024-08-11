import { useEffect, useRef } from "react";
import { ObservableImageElement } from "../../types";
import { getMutationObserver } from "../../utils/get-mutation-observer";
import { cx } from "../../utils/cx";

type Props = React.ImgHTMLAttributes<ObservableImageElement> & {
  isObservable: boolean;
  onMutation: () => void;
};

export function ObservableImage({
  isObservable,
  className,
  onMutation,
  ...props
}: Props) {
  const imgRef = useRef<ObservableImageElement>(null);

  // MutationObserver - Observes the image's src, and when it changes, the skeleton will reappear
  useEffect(() => {
    const mutationObserver = getMutationObserver();

    const current = imgRef.current;
    if (current && isObservable) {
      current.onMutation = onMutation;

      mutationObserver.observe(current, {
        attributes: true,
        attributeFilter: ["src"],
      });
    }

    return () => {
      if (current && isObservable) {
        mutationObserver.disconnect();
      }
    };
  }, [isObservable]);

  return (
    <img
      {...props}
      className={cx("rounded-full", className)}
      hidden={!isObservable}
      ref={imgRef}
    />
  );
}

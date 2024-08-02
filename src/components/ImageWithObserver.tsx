import { useEffect, useRef } from "react";
import { Image } from "./Image";
import { ObservableImageElement } from "../types";
import { getMutationObserver } from "../utils/get-mutation-observer";

type Props = React.ImgHTMLAttributes<ObservableImageElement> & {
  isObservable: boolean;
  onMutation: () => void;
};

export function ImageWithObserver({
  isObservable,
  onMutation,

  ...props
}: Props) {
  const imgRef = useRef<ObservableImageElement>(null);

  // MutatioObserver - observes image's src and when it changes, the skeleton will be back
  useEffect(() => {
    const mutationObserver = getMutationObserver();

    if (imgRef.current && isObservable) {
      imgRef.current.onMutation = onMutation;

      mutationObserver.observe(imgRef.current, {
        attributes: true,
        attributeFilter: ["src"],
      });
    }

    const current = imgRef.current;

    return () => {
      if (current && isObservable) {
        mutationObserver.disconnect();
      }
    };
  }, [isObservable]);

  return <Image hidden={!isObservable} {...props} ref={imgRef} />;
}

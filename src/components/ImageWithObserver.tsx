import { useEffect, useRef } from "react";
import { Image } from "./Image";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  isObservable: boolean;
  onMutate: () => void;
};

export function ImageWithObserver({ isObservable, onMutate, ...props }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);

  // MutatioObserver - observes image's src and when it changes, the skeleton will be back
  useEffect(() => {
    const MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;

    const handleChangeAvatar = (entries: MutationRecord[]) => {
      entries.forEach((entry) => {
        if (entry.type === "attributes") {
          onMutate();
        }
      });
    };

    const mutationObserver = new MutationObserver(handleChangeAvatar);

    if (imgRef.current && isObservable) {
      mutationObserver.observe(imgRef.current, {
        attributes: true,
        attributeFilter: ["src"],
      });
    }

    const current = imgRef.current;

    return () => {
      if (current) mutationObserver.disconnect();
    };
  }, [isObservable]);

  return <Image hidden={!isObservable} {...props} ref={imgRef} />;
}

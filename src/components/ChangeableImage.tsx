import { useEffect, useState } from "react";
import { Image } from "./Image/Image";

const getNewImage = () => `https://picsum.photos/200?t=${Date.now()}`;

export function ChangeableImage() {
  const [image, setImage] = useState(getNewImage);

  useEffect(() => {
    setTimeout(() => {
      setImage(getNewImage());
    }, 3_000);
  }, [image]);

  return <Image width={200} height={200} src={image} threshold={0} />;
}

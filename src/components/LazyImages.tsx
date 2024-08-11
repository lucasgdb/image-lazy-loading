import { Image } from "./Image/Image";

const generateCounter = 100;
const imageSize = 120;

const arrayOfImages = [...new Array(generateCounter)].map(
  (_, index) => `https://picsum.photos/${imageSize}?i=${index}`
);

export function LazyImages() {
  return arrayOfImages.map((src, index) => (
    <Image width={imageSize} height={imageSize} src={src} key={index} />
  ));
}

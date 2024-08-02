import styled from "styled-components";
import { ImageWithLoader } from "./ImageWithLoader";

const generateCounter = 100;
const imageSize = 120;

const arrayOfImages = [...new Array(generateCounter)].map(
  (_, index) => `https://picsum.photos/${imageSize}?i=${index}`
);

export function Gallery() {
  return (
    <GalleryContainer>
      {arrayOfImages.map((image, index) => (
        <ImageWithLoader
          width={imageSize}
          height={imageSize}
          threshold={0.5}
          src={image}
          key={index}
        />
      ))}
    </GalleryContainer>
  );
}

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

import styled from "styled-components";
import { ImageWithLoader } from "./ImageWithLoader";
import { useEffect, useState } from "react";

const generateCounter = 100;
const imageSize = 120;

const arrayOfImages = [...new Array(generateCounter)].map(
  (_, index) => `https://picsum.photos/${imageSize}?i=${index}`
);

export function Gallery() {
  const [image, setImage] = useState(
    "https://picsum.photos/200?t=" + Date.now()
  );

  useEffect(() => {
    setTimeout(() => {
      setImage("https://picsum.photos/200?t=" + Date.now());
    }, 3000);
  }, [image]);

  return (
    <GalleryContainer>
      <ImageWithLoader
        width={imageSize}
        height={imageSize}
        threshold={0.5}
        src={image}
      />

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
  align-items: center;
  gap: 16px;
`;

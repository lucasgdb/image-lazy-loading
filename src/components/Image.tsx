import { forwardRef } from "react";
import styled from "styled-components";

export const Image = forwardRef<
  HTMLImageElement,
  React.HTMLAttributes<HTMLImageElement>
>(function (props, ref) {
  return <ImageContainer {...props} ref={ref} />;
});

export const ImageContainer = styled.img`
  border-radius: 50%;
`;

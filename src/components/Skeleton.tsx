import styled, { css, keyframes } from "styled-components";

type Props = {
  width: number | string;
  height: number | string;
};

export const Skeleton = styled.span<Props>`
  ${({ width, height }) => css`
    display: inline-block;
    background-color: #dce0e8;

    border-radius: 50%;

    width: ${typeof width === "string" ? width : `${width}px`};
    height: ${typeof height === "string" ? height : `${height}px`};

    animation: ${spin} 1.2s ease-in-out infinite;
  `}
`;

const spin = keyframes`
  0% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.5;
  }
`;

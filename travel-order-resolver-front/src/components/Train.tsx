import React, { ReactElement } from "react";
import { keyframes } from "@chakra-ui/react";

import { Image } from "@chakra-ui/react";
interface Props {
  isLoading: boolean;
}

export default function Train({ isLoading }: Props): ReactElement {
  const trainQuitKeyframe = keyframes`
  0% {
    transform: translateX(-700px);
  }
  100% {
    transform: translateX(2000px);
  }
`;

  const trainEnterKeyframe = keyframes`
  0% {
    transform: translateX(-1200px);
  }
  100% {
    transform: translateX(-700px);
  }
`;

  const trainQuit = `${trainQuitKeyframe} 7s cubic-bezier(0.11, 0, 0.5, 0) forwards`;
  const trainEnter = `${trainEnterKeyframe} 2s cubic-bezier(0.33, 1, 0.68, 1) forwards`;

  return (
    <Image
      src={"/train.png"}
      animation={isLoading ? trainQuit : trainEnter}
      position={"fixed"}
      bottom={0}
    />
  );
}

import React, { ReactElement } from "react";
import { keyframes } from "@chakra-ui/react";

import { Image } from "@chakra-ui/react";

export default function Train(): ReactElement {
  const trainPosition = keyframes`
  0% {
    transform: translateX(-700px);
  }
  100% {
    transform: translateX(2000px);
  }
`;

  const trainstart = `${trainPosition} 7s cubic-bezier(0.11, 0, 0.5, 0) forwards`;
  return (
    <Image
      src={"/train.png"}
      animation={trainstart}
      position={"fixed"}
      bottom={0}
    />
  );
}

import React from "react";
import { Box } from "@chakra-ui/layout";
import { keyframes } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export default function GradiantBackground({ children }: Props): JSX.Element {
  const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
  const animation = `${gradientAnimation} 30s ease infinite`;
  return (
    <Box
      width={"100%"}
      height={"100vh"}
      minHeight={"100vh"}
      bgGradient="linear-gradient(
    221deg,
    #e53e3e,
    #dd6b20,
    #d69e2e,
    #38a169,
    #319795,
    #3182ce,
    #00b5d8,
    #805ad5,
    #d53f8c
  )"
      bgSize="1800% 1800%"
      animation={animation}
    >
      {children}
    </Box>
  );
}

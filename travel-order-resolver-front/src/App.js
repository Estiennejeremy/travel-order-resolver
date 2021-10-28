import React from "react";
import "./App.css";
import { Heading, Stack, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { FaMicrophone } from "react-icons/fa";
function App() {
  return (
    <Stack py={4} direction="column" spacing={6} alignItems="center">
      <Heading as="h1" color="whiteAlpha.500">
        Travel Order Resolver
      </Heading>
      <Text color="whiteAlpha.500">
        Click on the "record" button and ask to go to a destination by
        specifying your starting point
      </Text>
      <IconButton
        isRound={true}
        icon={<FaMicrophone />}
        size="lg"
        colorScheme="red"
      />
    </Stack>
  );
}

export default App;

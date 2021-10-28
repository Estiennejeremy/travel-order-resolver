import React from "react";
import "./App.css";
import { Heading, Stack, Text, Box } from "@chakra-ui/layout";
import { IconButton, keyframes } from "@chakra-ui/react";
import { FaMicrophone } from "react-icons/fa";
import useSpeechToText from "./Hooks";
import "./App.css";

function App() {
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
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    crossBrowser: true,
    googleApiKey: process.env.REACT_APP_API_KEY,
    speechRecognitionProperties: { interimResults: true },
    useLegacyResults: false,
  });

  const Error = () => {
    if (error) {
      return (
        <Box
          style={{
            maxWidth: "600px",
            margin: "100px auto",
            textAlign: "center",
          }}
        >
          <Text>
            {error}
            <Text as="span" style={{ fontSize: "3rem" }}>
              🤷‍
            </Text>
          </Text>
        </Box>
      );
    }
    return null;
  };

  if (error) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "100px auto",
          textAlign: "center",
        }}
      >
        <p>
          {error}
          <span style={{ fontSize: "3rem" }}>🤷‍</span>
        </p>
      </div>
    );
  }

  return (
    <Box
      width={"100%"}
      height={"100vh"}
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
      <Stack py={4} direction="column" spacing={6} alignItems="center">
        <Heading as="h1" fontSize="4xl" color="whiteAlpha.700">
          Travel Order Resolver
        </Heading>
        <Text fontSize="2xl" color="whiteAlpha.700" align="center">
          Click on the "record" button and ask to go to a destination by
          specifying your starting point
        </Text>
        <IconButton
          isRound={true}
          icon={<FaMicrophone />}
          size="lg"
          colorScheme="red"
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
          data-recording={isRecording}
        />
        <Text color="whiteAlpha.600">
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Text>
        <Error />
        <ul>
          {results.map((result) => (
            <li key={result.timestamp}>{result.transcript}</li>
          ))}
          {interimResult && <li>{interimResult}</li>}
        </ul>
      </Stack>
    </Box>
  );
}

export default App;

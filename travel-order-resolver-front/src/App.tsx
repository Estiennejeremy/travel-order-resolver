import React, { useEffect, useState } from "react";
import "./App.css";
import { Heading, Stack, Text, Box, Flex, Center } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { FaMicrophone } from "react-icons/fa";
import useSpeechToText from "./Hooks";
import { ResultType } from "./Hooks/index";
import axios from "axios";
import "./App.css";
import GradiantBackground from "./components/GradiantBackground";
import Train from "./components/Train";
import ErrorDisplay from "./components/ErrorDisplay";
import OrdersAndJourney from "./components/OrdersAndTravels";

function App() {
  const {
    error,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    crossBrowser: true,
    googleApiKey: process.env.REACT_APP_API_KEY,
    speechRecognitionProperties: { interimResults: false },
    useLegacyResults: false,
  });
  const [listOfTravel, setListOfTravel] = useState<string[][]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Ask traversed station to backend when results change
  useEffect(() => {
    if (results.length > 0) {
      const speechResult = results[results.length - 1] as ResultType;
      const lastOrder = speechResult.transcript;
      setIsLoading(true);
      axios
        .post("http://localhost:8000/nlp/", {
          trajet: lastOrder,
        })
        .then((res) => {
          res.status === 200 &&
            setListOfTravel([...listOfTravel, res.data.result]);
          res.status === 204 &&
            setListOfTravel([...listOfTravel, ["Pas de résultat"]]);
        })
        .catch((err) => {
          console.error(err);
        });
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  return (
    <GradiantBackground>
      <Stack py={4} direction="column" spacing={6} alignItems="center">
        <Heading as="h1" fontSize="4xl" color="whiteAlpha.700">
          Travel Order Resolver
        </Heading>
        <Text fontSize="2xl" color="whiteAlpha.700" align="center">
          Click and hold your mouse on the "record" button while you order your
          train journey.
        </Text>
        <IconButton
          aria-label="record"
          isRound={true}
          icon={<FaMicrophone />}
          size="lg"
          colorScheme="red"
          onMouseDown={startSpeechToText}
          onMouseUp={stopSpeechToText}
          onMouseLeave={stopSpeechToText}
          data-recording={isRecording}
          isDisabled={isLoading}
        />
        <Text color="whiteAlpha.600">
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Text>
        <ErrorDisplay error={error} />
        <Flex justify={"space-evenly"} width={"full"}>
          <Box width={"45%"}>
            <Center>
              <Heading as="h2" fontSize="2xl" color="whiteAlpha.700">
                Orders
              </Heading>
            </Center>
          </Box>
          <Box width={"45%"}>
            <Center>
              <Heading as="h2" fontSize="2xl" color="whiteAlpha.700">
                Travel journey
              </Heading>
            </Center>
          </Box>
        </Flex>
        <OrdersAndJourney listOfTravel={listOfTravel} results={results} />
      </Stack>
      <Train />
    </GradiantBackground>
  );
}

export default App;

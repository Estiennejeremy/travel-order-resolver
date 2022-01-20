import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Heading,
  Stack,
  Text,
  Box,
  Flex,
  List,
  ListItem,
  Center,
} from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { IconButton, keyframes, Button } from "@chakra-ui/react";
import { FaMicrophone, FaTimes, FaCheck } from "react-icons/fa";
import useSpeechToText from "./Hooks";
import { ResultType } from "./Hooks/index";
import axios from "axios";
import Switch from "react-switch";
import { TextInput } from 'evergreen-ui';
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
  const trainPosition = keyframes`
  0% {
    transform: translateX(-700px);
  }
  100% {
    transform: translateX(2000px);
  }
`;
  const animation = `${gradientAnimation} 30s ease infinite`;
  const trainstart = `${trainPosition} 7s cubic-bezier(0.11, 0, 0.5, 0) forwards`;
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
    speechRecognitionProperties: { interimResults: false },
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
  const [listOfJourney, setListOfJourney] = useState<string[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(String);

  const [ordersTab, setOrdersTab] = useState<string[]>([]);

  function handleOrder() {
    setOrdersTab([...ordersTab, order])
  }

  function removeOrder(index: number) {
    var tab = ordersTab
    tab.splice(index, 1)
    setOrdersTab(tab)
  }

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
            setListOfJourney([...listOfJourney, res.data.result]);
          res.status === 204 &&
            setListOfJourney([...listOfJourney, ["No result"]]);
        });
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  function handleChange() {
    setIsLoading(!isLoading)
  }

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
      <Stack py={4} direction="column" spacing={6} alignItems="center">
        <Stack direction="row" style={{ position: 'absolute', left: "5%", top: "5%" }}>
          {console.log("start")}
          <Switch onChange={handleChange} checked={isLoading} />
          {isLoading ?
            <Text color={'white'}>
              Switch to enable the vocal mode
            </Text> :
            <Text color={'white'}>
              Switch to enable the writing mode
            </Text>
          }
        </Stack>
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
        <Error />
        <Flex justify={"space-evenly"} width={"full"}>
          <Box width={"45%"}>
            <Center>
              <Heading as="h2" fontSize="2xl" color="whiteAlpha.700">
                Orders
              </Heading>
            </Center>
            {
              isLoading ?
                ordersTab.length > 0 ?
                  <Center position={'absolute'} left={'2%'} top={'41.5%'}>
                    <Button >
                      <Text>
                        Lancer la recherche
                      </Text>
                    </Button>
                  </Center>
                  :
                  <></>
                :
                <></>
            }
            <Center >
              {isLoading ?
                <>
                  <TextInput
                    onChange={(e: { target: { value: string; }; }) => setOrder(e.target.value)}
                    placeholder="Type your sentence here"
                  />
                  <IconButton
                    aria-label="Check"
                    icon={<FaCheck />}
                    size="m"
                    colorScheme="green"
                    onClick={() => handleOrder()}
                    left={'20px'}
                    padding={1}
                    borderColor={'black'}
                    borderWidth={0.5}
                  />
                </>
                : <></>
              }
            </Center>

            <List spacing={3}>
              {console.log("here")}
              {console.log(ordersTab)}
              {
                !isLoading ?
                  (results as ResultType[]).map((result) => (
                    <Center>
                      <ListItem key={result.timestamp}>
                        {result.transcript}
                      </ListItem>
                    </Center>
                  ))
                  :
                  ordersTab.map((ord, index) => (
                    <Center>
                      <ListItem key={index}>
                        <Stack direction="row" alignItems="center">
                          <Text>
                            {ord}
                          </Text>
                          <IconButton
                            aria-label="Suppr"
                            icon={<FaTimes />}
                            size="s"
                            colorScheme="red"
                            onClick={() => removeOrder(index)}
                          />
                        </Stack>
                      </ListItem>
                    </Center>
                  ))
              }
            </List>



          </Box>
          <Box width={"45%"}>
            <Center>
              <Heading as="h2" fontSize="2xl" color="whiteAlpha.700">
                Travel journey
              </Heading>
            </Center>
            <List spacing={3}>
              {listOfJourney.length > 0 &&
                listOfJourney.map((journey, index) => (
                  <Center>
                    <ListItem key={index}>
                      <Text>
                        {journey.map((city, index) => {
                          return `${city}${index === journey.length - 1 ? "" : " ➡️ "
                            }`;
                        })}
                      </Text>
                    </ListItem>
                  </Center>
                ))}
            </List>
          </Box>
        </Flex>
      </Stack>
      <Image
        src={"/train.png"}
        animation={trainstart}
        position={"fixed"}
        bottom={0}
      />
    </Box >
  );
}

export default App;

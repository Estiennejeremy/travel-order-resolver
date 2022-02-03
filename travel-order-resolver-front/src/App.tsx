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
import { IconButton, keyframes, Button, Image } from "@chakra-ui/react";
import { FaMicrophone, FaTimes, FaCheck } from "react-icons/fa";
import useSpeechToText from "./Hooks";
import { ResultType } from "./Hooks/index";
import axios from "axios";
import Switch from "react-switch";
import { TextInput } from 'evergreen-ui';
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
    setResults,
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
  const [writtingMode, setWrittingMode] = useState(false);
  const [order, setOrder] = useState(String);
  const [orderToShow, setOrderToShow] = useState("");

  function fetchTravel() {
    setResults((prevResults)=>[
      ...prevResults,
      {
        transcript: orderToShow,
        timestamp: Math.floor(Date.now() / 1000),
      }
    ])



    // if (orderToShow !== "") {
    //   axios
    //     .post("https://api.damned-i-am-lost.com/nlp", {
    //       trajet: orderToShow,
    //     })
    //     .then((res) => {
    //       res.status === 200 &&
    //         setListOfTravel([...listOfTravel, res.data.result]);
    //       res.status === 204 &&
    //         setListOfTravel([...listOfTravel, ["Pas de résultat"]]);
    //       setIsLoading(false);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //       setIsLoading(false);
    //     });
    // }
  }

  // Ask traversed station to backend when results change
  useEffect(() => {
    console.log(`results`, results)
    if (results.length > 0) {
      const speechResult = results[results.length - 1] as ResultType;
      const lastOrder = speechResult.transcript;
      setIsLoading(true);
      axios
        .post("https://api.damned-i-am-lost.com/nlp/", {
          trajet: lastOrder,
        })
        .then((res) => {
          res.status === 200 &&
            setListOfTravel([...listOfTravel, res.data.result]);
          res.status === 204 &&
            setListOfTravel([...listOfTravel, ["Pas de résultat"]]);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  function handleChange() { 
    setWrittingMode(!writtingMode)
  }

  return (
    <GradiantBackground>
      <Stack py={4} direction="column" spacing={6} alignItems="center">
        <Stack direction="row" style={{ position: 'absolute', left: "5%", top: "5%" }}>
          {console.log("start")}
          <Switch onChange={handleChange} checked={writtingMode} />
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
        {
          writtingMode ? 
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
          isDisabled={true}
        />
        :
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
        }
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
            {
              writtingMode ?
                orderToShow !== "" ?
                  <Center position={'absolute'} left={'2%'} top={'41.5%'}>
                    <Button onClick={() => fetchTravel()}>
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
              {writtingMode ?
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
                    onClick={() => setOrderToShow(order)}
                    left={'20px'}
                    padding={1}
                    borderColor={'black'}
                    borderWidth={0.5}
                  />
                </>
                : <></>
              }
            </Center>

            {/* <List spacing={3}>
              {
                !writtingMode ?
                  (results as ResultType[]).map((result) => (
                    <Center>
                      <ListItem key={result.timestamp}>
                        {result.transcript}
                      </ListItem>
                    </Center>
                  ))
                  :
                  <Center>
                    <Stack direction="row" alignItems="center">
                      {console.log(orderToShow)}
                      {orderToShow !== "" ?
                        <>
                          <Text>
                            {orderToShow}
                          </Text>
                          <IconButton
                            aria-label="Suppr"
                            icon={<FaTimes />}
                            size="s"
                            colorScheme="red"
                            onClick={() => setOrderToShow("")}
                          />
                        </>
                        :
                        <></>
                      }
                    </Stack>
                  </Center>
              }
            </List> */}
          </Box>
          <Box width={"45%"}>
            <Center>
              <Heading as="h2" fontSize="2xl" color="whiteAlpha.700">
                Travel journey
              </Heading>
            </Center>
            {/* <List spacing={3}>
              {listOfTravel.length > 0 &&
                listOfTravel.map((journey, index) => (
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
            </List> */}
          </Box>
        </Flex>
        <OrdersAndJourney listOfTravel={listOfTravel} results={results} />
      </Stack>
      <Train isLoading={isLoading} />
    </GradiantBackground>
  );
}

export default App;

import React from "react";
import { ResultType } from "../Hooks";
import { Text, Box, Flex, Center } from "@chakra-ui/layout";
interface Props {
  listOfTravel: string[][];
  results: ResultType[] | string[];
}

export default function OrdersAndTravels({
  listOfTravel,
  results,
}: Props): JSX.Element | null {
  if (results) {
    return (
      <>
        {(results as ResultType[]).map((result, index) => (
          <Flex justify={"space-evenly"} width={"full"} key={index}>
            <Box width={"45%"}>
              <Center key={result.timestamp}>
                <Text>{result.transcript}</Text>
              </Center>
            </Box>
            <Box width={"45%"}>
              <Center key={index}>
                <Text>
                  {listOfTravel[index] &&
                    listOfTravel[index].map((city, i) => {
                      return `${city}${
                        i === listOfTravel[index].length - 1 ? "" : " ➡️ "
                      }`;
                    })}
                </Text>
              </Center>
            </Box>
          </Flex>
        ))}
      </>
    );
  } else {
    return null;
  }
}

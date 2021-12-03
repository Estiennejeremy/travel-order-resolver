import React from "react";
import { Text, ListItem, Center } from "@chakra-ui/layout";

interface Props {
  listOfJourney: string[][];
}

const JourneyItem = ({ listOfJourney }: Props): JSX.Element | null => {
  if (listOfJourney.length > 0) {
    return (
      <>
        {listOfJourney.map((journey, index) => (
          <Center key={index}>
            <ListItem>
              <Text>
                {journey.map((city, index) => {
                  return `${city}${index === journey.length - 1 ? "" : " ➡️ "}`;
                })}
              </Text>
            </ListItem>
          </Center>
        ))}
      </>
    );
  } else {
    return null;
  }
};

export default JourneyItem;

import React from "react";
import { ResultType } from "../Hooks";
import { ListItem, Center } from "@chakra-ui/layout";

interface Props {
  results: ResultType[] | string[];
}

export default function OrderItem({ results }: Props): JSX.Element {
  return (
    <>
      {(results as ResultType[]).map((result) => (
        <Center key={result.timestamp}>
          <ListItem>{result.transcript}</ListItem>
        </Center>
      ))}
    </>
  );
}

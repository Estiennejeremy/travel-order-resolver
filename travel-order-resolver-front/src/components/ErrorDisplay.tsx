import React, { ReactElement } from "react";
import { Text, Box } from "@chakra-ui/layout";
interface Props {
  error: string;
}

export default function ErrorDisplay({ error }: Props): ReactElement | null {
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
}

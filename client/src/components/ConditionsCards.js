//conditions cards to pull into conditions list
import React from "react";
import { useHistory } from "react-router-dom";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function ConditionsCard({ condition }) {
  const history = useHistory();
  const { name, description } = condition;

  function handleClick() {
    history.push(`/conditions/${condition.id}`);
    console.log("hi");
  }
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Stack>
          <Text>{description}</Text>
          <Button onClick={handleClick}>Select Condition</Button>
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  );
}

//for the four conditions to go into rxmatch
import React, { useEffect, useState } from "react";
import ConditionsCard from "../components/ConditionsCard";
import { Heading, Text, Stack, Accordion } from "@chakra-ui/react";

const conditionsAPI = "/api/conditions";

function Conditions() {
  const [conditionsData, setConditionsData] = useState([]);

  useEffect(() => {
    fetch(conditionsAPI, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        setConditionsData(data);
      });
  }, []);

  const renderConditions = conditionsData.map((condition) => {
    return <ConditionsCard key={condition.id} condition={condition} />;
  });

  return (
    <Stack spacing={3}>
      <Heading align="center" as="h1">
        Conditions
      </Heading>
      <Text align="center">
        Click on a condition to learn more and enter RXMatch.
      </Text>
      <Accordion allowMultiple>{renderConditions}</Accordion>
    </Stack>
  );
}

export default Conditions;

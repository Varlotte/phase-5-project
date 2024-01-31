//for the four conditions to go into rxmatch
import React, { useEffect, useState } from 'react';

import { Accordion, Heading, Stack, Text } from '@chakra-ui/react';

import { get } from '../api';
import ConditionsCard from '../components/ConditionCard';
import type { Condition } from '../types';

function Conditions() {
  const [conditionsData, setConditionsData] = useState<Condition[]>([]);

  useEffect(() => {
    get('/api/conditions').then((data) => {
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

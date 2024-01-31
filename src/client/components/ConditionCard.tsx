import React from 'react';

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import type { Condition } from '../types';

type ConditionCardProps = {
  condition: Condition;
};

export default function ConditionCard({ condition }: ConditionCardProps) {
  const navigate = useNavigate();
  const { name, description, id } = condition;

  function handleClick() {
    navigate(`/conditions/${id}`);
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
          <Text
            className="conditionDesc"
            dangerouslySetInnerHTML={{ __html: description }}
          ></Text>
          <Button onClick={handleClick}>Select Condition</Button>
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  );
}

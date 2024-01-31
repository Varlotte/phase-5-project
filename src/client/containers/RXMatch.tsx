//displays rx match
import React, { useContext, useEffect, useState } from 'react';

import { Heading, Stack, Text } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';

import Link from '../components/Link';
import MedicationsCard from '../components/MedicationCard';
import { CurrentUserContext } from '../utils';
import type { Medication } from '../types';

function RXMatch() {
  let { id } = useParams();
  // console.log(id);
  const conditionAPI = `/api/conditions/${id}`;
  const { currentUser } = useContext(CurrentUserContext);
  const [medicationsData, setMedicationsData] = useState<Medication[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(conditionAPI, { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        setMedicationsData(data.medications);
        // console.log(data);
      });
  }, [conditionAPI]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Stack textAlign="center">
      <Heading as="h1">RXMatch</Heading>
      <Text fontWeight="bold">Fave a med to save it to your account!</Text>
      <Text fontSize="xs">
        RXMatch is not a diagnostic tool. Discuss all treatments with your
        provider. Side effects may vary. For more medication and side effects
        information, search for medication at{' '}
        <Link href="http://www.medlineplus.gov">www.medlineplus.gov.</Link>
      </Text>

      <ul className="cards">
        {medicationsData.map((medication, i) => {
          // console.log(medication);
          return index === i ? (
            <MedicationsCard
              key={medication.id}
              medication={medication}
              setIndex={setIndex}
              total={medicationsData.length}
              index={index + 1}
            />
          ) : null;
        })}
      </ul>
      {index >= medicationsData.length ? (
        <Text as="h1">
          That's all we have for now! Check your current faves in{' '}
          <Link to="/account/">your account!</Link>
        </Text>
      ) : null}
    </Stack>
  );
}
//faving or canceling needs to change the index value, if index is array.length,show "no more meds to display" update index with setIndex
export default RXMatch;

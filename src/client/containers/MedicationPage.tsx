import React, { useEffect, useState } from 'react';

import { Heading, Image, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { get } from '../api';
import Link from '../components/Link';
import type { Medication } from '../types';

export default function MedicationPage() {
  let { id } = useParams();
  const medicationAPI = `/api/medications/${id}`;
  const [medication, setMedication] = useState<Medication | null>(null);

  useEffect(() => {
    get(medicationAPI).then((data) => {
      setMedication(data);
    });
  }, [medicationAPI]);

  if (id || !medication) {
    return null;
  }

  const {
    nameBrand,
    nameGeneric,
    drugClass,
    prescribedFor,
    sideEffects,
    image,
  } = medication;

  return (
    <Stack align="center">
      <Text fontSize="xs">
        RXMatch is not a diagnostic tool. Discuss all treatments with your
        provider. Side effects may vary. For more medication and side effects
        information, search for medication at{' '}
        <Link href="http://www.medlineplus.gov">www.medlineplus.gov.</Link>
      </Text>
      <Heading as="h1">Generic Name: {nameGeneric}</Heading>
      <Heading as="h2">Brand Name: {nameBrand}</Heading>
      <Text fontWeight="bold">Drug Class:</Text>
      <Text> {drugClass}</Text>
      <Text fontWeight="bold">Also Treats:</Text>
      <Text>{prescribedFor}</Text>
      <Text fontWeight="bold">Common Side Effects Include:</Text>
      <Text>{sideEffects}</Text>
      <Image
        src={image}
        alt={nameGeneric}
        boxSize="150px"
        borderRadius="full"
      />
    </Stack>
  );
}

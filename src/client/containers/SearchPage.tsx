import React, { useEffect, useState } from 'react';

import { Stack, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { get } from '../api';
import Link from '../components/Link';
import MedicationCard from '../components/MedicationCard';
import type { Medication } from '../types';

export default function SearchPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get('q');
  const medicationsAPI = `/api/medications?q=${query}`;
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    get(medicationsAPI).then((data) => {
      setMedications(data);
      setLoading(false);
    });
  }, [medicationsAPI]);

  if (query && loading) {
    return null;
  }

  return (
    <Stack align="center" textAlign="center">
      <Text fontSize="xs">
        RXMatch is not a diagnostic tool. Discuss all treatments with your
        provider. Side effects may vary. For more medication and side effects
        information, search for medication at{' '}
        <Link href="http://www.medlineplus.gov">www.medlineplus.gov.</Link>
      </Text>
      <ul className="cards">
        {medications.map((medication, i) => {
          return <MedicationCard key={medication.id} medication={medication} />;
        })}
      </ul>
      {!medications.length ? (
        <Text as="h1">
          No results! Check your current faves in{' '}
          <Link to="/account/">your account!</Link>
        </Text>
      ) : null}
    </Stack>
  );
}

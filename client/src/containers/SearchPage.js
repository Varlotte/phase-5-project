import React, { useEffect, useState } from "react";
import MedicationsCard from "../components/MedicationsCard";
import Link from "../components/Link";
import { Text, Stack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export default function SearchPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get("q");
  const medicationsAPI = `/api/medications?q=${query}`;
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(medicationsAPI, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
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
        information, search for medication at{" "}
        <Link href="http://www.medlineplus.gov" target="_blank">
          www.medlineplus.gov.
        </Link>
      </Text>
      <ul className="cards">
        {medications.map((medication, i) => {
          return (
            <MedicationsCard key={medication.id} medication={medication} />
          );
        })}
      </ul>
      {!medications.length ? (
        <Text as="h1">
          No results! Check your current faves in{" "}
          <Link to="/account/">your account!</Link>
        </Text>
      ) : null}
    </Stack>
  );
}

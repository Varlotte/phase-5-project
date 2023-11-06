import React, { useEffect, useState } from "react";
import MedicationsCard from "../components/MedicationsCard";
import { useParams } from "react-router-dom";
import Link from "../components/Link";
import { Heading, Text, Stack, Image } from "@chakra-ui/react";

export default function MedicationPage() {
  let { id } = useParams();
  const medicationAPI = `http://127.0.0.1:5555/medications/${id}`;
  const [medication, setMedication] = useState(null);

  useEffect(() => {
    fetch(medicationAPI, { credentials: "include", mode: "cors" })
      .then((r) => r.json())
      .then((data) => {
        setMedication(data);
      });
  }, [medicationAPI]);

  if (id && !medication) {
    return null;
  }

  const {
    name_brand,
    name_generic,
    drug_class,
    prescribed_for,
    side_effects,
    pill_image,
  } = medication;

  return (
    <Stack align="center">
      <Text fontSize="xs">
        RXMatch is not a diagnostic tool. Discuss all treatments with your
        provider. Side effects may vary. For more medication and side effects
        information, search for medication at{" "}
        <Link href="http://www.medlineplus.gov" target="_blank">
          www.medlineplus.gov.
        </Link>
      </Text>
      <Heading as="h1">Generic Name: {name_generic}</Heading>
      <Heading as="h2">Brand Name: {name_brand}</Heading>
      <Text fontWeight="bold">Drug Class:</Text>
      <Text> {drug_class}</Text>
      <Text fontWeight="bold">Also Treats:</Text>
      <Text>{prescribed_for}</Text>
      <Text fontWeight="bold">Common Side Effects Include:</Text>
      <Text>{side_effects}</Text>
      <Image
        src={pill_image}
        alt={name_generic}
        boxSize="150px"
        borderRadius="full"
      />
    </Stack>
  );
}

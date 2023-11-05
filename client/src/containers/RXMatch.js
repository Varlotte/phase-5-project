//displays rx match
import React, { useEffect, useState, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import MedicationsCard from "../components/MedicationsCard";
import { CurrentUserContext } from "../utils";
import Link from "../components/Link";
import { Heading, Text, Stack } from "@chakra-ui/react";

function RXMatch() {
  let { id } = useParams();
  // console.log(id);
  const conditionAPI = `http://127.0.0.1:5555/conditions/${id}`;
  const { currentUser } = useContext(CurrentUserContext);
  const [medicationsData, setMedicationsData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(conditionAPI, { credentials: "include", mode: "cors" })
      .then((r) => r.json())
      .then((data) => {
        setMedicationsData(data.medications);
        // console.log(data);
      });
  }, [conditionAPI]);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Stack textAlign="center">
      <Heading as="h1">RXMatch</Heading>
      <Text fontWeight="bold">Fave a med to save it to your account!</Text>
      <Text fontSize="xs">
        RXMatch is not a diagnostic tool. Discuss all treatments with your
        provider. Side effects may vary. For more medication and side effects
        information, search for medication at{" "}
        <Link href="http://www.medlineplus.gov" target="_blank">
          www.medlineplus.gov.
        </Link>
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
          That's all we have for now! Check your current faves in{" "}
          <Link to="/account/">your account!</Link>
        </Text>
      ) : null}
    </Stack>
  );
}
//faving or canceling needs to change the index value, if index is array.length,show "no more meds to display" update index with setIndex
export default RXMatch;

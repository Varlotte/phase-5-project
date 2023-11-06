//medications cards to pull into faves and rx match
import React, { useContext } from "react";
import { CurrentUserContext } from "../utils";
import {
  Card,
  CardBody,
  IconButton,
  Center,
  Text,
  Image,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { GrLike, GrDislike } from "react-icons/gr";

export default function MedicationsCard({
  medication,
  setIndex,
  index,
  total,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const {
    name_brand,
    name_generic,
    drug_class,
    prescribed_for,
    side_effects,
    pill_image,
  } = medication;

  const toast = useToast();

  const handleFaveClick = () => {
    const newFave = { user_id: currentUser, medication_id: medication.id };
    fetch("http://127.0.0.1:5555/faves", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(newFave),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast({
            title: "Medication Already Faved.",
            description: "Can't fave the same med twice.",
            status: "error",
            duration: 2000,
            position: "bottom-left",
            isClosable: true,
          });
          setIndex && setIndex((prevIndex) => prevIndex + 1);
        } else {
          setIndex && setIndex((prevIndex) => prevIndex + 1);
          toast({
            title: "Medication Faved.",
            description: "Check your account to see your faves.",
            status: "success",
            duration: 2000,
            position: "bottom-right",
            isClosable: true,
          });
        }
      });
  };
  //setIndex to index +1
  //index is array.length,show "no more meds to display"

  const handleIgnoreClick = () => {
    setIndex && setIndex((prevIndex) => prevIndex + 1);
    toast({
      title: "Medication Ignored.",
      description: "Keep exploring new meds.",
      status: "info",
      duration: 2000,
      position: "bottom-left",
      isClosable: true,
    });
  };

  return (
    <Card>
      <CardBody>
        <Text>Brand Name: {name_brand}</Text>
        <Text>Generic Name: {name_generic}</Text>
        <Text margin={1} fontSize="smaller">
          Drug Class: {drug_class}
        </Text>
        <Text margin={1} fontSize="small">
          Also Treats: {prescribed_for}
        </Text>
        <Text margin={4} fontSize="small">
          Common Side Effects: {side_effects}
        </Text>
        <Center>
          <Image
            src={pill_image}
            alt={name_generic}
            boxSize="150px"
            borderRadius="full"
            padding={2}
          />
        </Center>
        <Flex display={"block"}>
          <IconButton
            aria-label="Ignore Medication"
            className="ignore"
            onClick={handleIgnoreClick}
            icon={<GrDislike />}
            margin={3}
            size="lg"
            isDisabled={!currentUser}
          >
            Ignore This Med
          </IconButton>
          <IconButton
            aria-label="Fave Medication"
            className="faveheart"
            onClick={handleFaveClick}
            margin={3}
            size="lg"
            icon={<GrLike />}
            isDisabled={!currentUser}
          >
            Fave This Med
          </IconButton>
        </Flex>
        {index && total ? (
          <Text>
            {index}/{total}
          </Text>
        ) : null}
      </CardBody>
    </Card>
  );
}

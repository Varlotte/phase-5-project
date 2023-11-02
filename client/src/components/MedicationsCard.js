//medications cards to pull into faves and rx match
import React, { useContext } from "react";
import { CurrentUserContext } from "../utils";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  Stack,
  Center,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { FcDislike, FcLike } from "react-icons/fc";

export default function MedicationsCard({ medication, setIndex }) {
  const { currentUser } = useContext(CurrentUserContext);
  const {
    name_brand,
    name_generic,
    drug_class,
    prescribed_for,
    side_effects,
    pill_image,
  } = medication;

  const handleFaveClick = () => {
    const newFave = { user_id: currentUser, medication_id: medication.id };
    console.log(newFave);
    fetch("http://127.0.0.1:5555/faves", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(newFave),
    })
      .then((res) => res.json())
      .then((data) => {
        setIndex((prevIndex) => prevIndex + 1);
        console.log("faved");
      });
  };
  //setIndex to index +1
  //index is array.length,show "no more meds to display"

  const handleIgnoreClick = () => {
    setIndex((prevIndex) => prevIndex + 1);
    console.log("ignored");
  };

  return (
    <Card>
      <CardBody>
        <Text>Brand Name: {name_brand}</Text>
        <Text>Generic Name: {name_generic}</Text>
        <Text fontSize="smaller">Drug Class: {drug_class}</Text>
        <Text fontSize="small">Also Treats: {prescribed_for}</Text>
        <Text fontSize="small">Common Side Effects: {side_effects}</Text>
        <Center>
          <Image
            src={pill_image}
            alt={name_generic}
            boxSize="150px"
            borderRadius="full"
            padding={2}
          />
        </Center>
        <IconButton
          className="ignore"
          onClick={handleIgnoreClick}
          icon={<FcDislike />}
          margin={2}
          size="lg"
        >
          Ignore This Med
        </IconButton>
        <IconButton
          className="faveheart"
          onClick={handleFaveClick}
          margin={2}
          size="lg"
          icon={<FcLike />}
        >
          Fave This Med
        </IconButton>
      </CardBody>
    </Card>
  );
}

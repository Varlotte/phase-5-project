//medications cards to pull into faves and rx match
import React, { useContext } from 'react';

import {
  Card,
  CardBody,
  Center,
  Flex,
  IconButton,
  Image,
  Text,
  useToast,
} from '@chakra-ui/react';
import { GrDislike, GrLike } from 'react-icons/gr';

import { patch } from '../api';
import { useAuth } from '../AuthProvider';
import type { Medication } from '../types';

type MedicationCardProps = {
  medication: Medication;
  setIndex?: (i: number | ((i: number) => number)) => void;
  index?: number;
  total?: number;
};

export default function MedicationsCard({
  medication,
  setIndex,
  index,
  total,
}: MedicationCardProps) {
  const { currentUser } = useAuth();
  const {
    nameBrand,
    nameGeneric,
    drugClass,
    prescribedFor,
    sideEffects,
    image,
  } = medication;

  const toast = useToast();

  const handleFaveClick = async () => {
    const ids = {
      userUid: currentUser?.uid,
      medicationId: medication.id,
    };
    const newFave = {
      faves: {
        upsert: {
          where: {
            userUid_medicationId: ids,
          },
          create: {
            medication: {
              connect: { id: medication.id },
            },
          },
          update: { unfavedOn: null },
        },
      },
    };

    try {
      await patch(`/api/users/${currentUser?.uid}`, newFave, true);
      toast({
        title: 'Medication Faved.',
        description: 'Check your account to see your faves.',
        status: 'success',
        duration: 2000,
        position: 'bottom-right',
        isClosable: true,
      });
    } catch (e: any) {
      console.error(`Error adding fave: ${e.message}`);
      toast({
        title: 'Medication Already Faved.',
        description: "Can't fave the same med twice.",
        status: 'error',
        duration: 2000,
        position: 'bottom-left',
        isClosable: true,
      });
    } finally {
      // Advance the array to show the next medication. If we're at the end
      // of the array, it will show "no more medications".
      setIndex && setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleIgnoreClick = () => {
    setIndex && setIndex((prevIndex) => prevIndex + 1);
    toast({
      title: 'Medication Ignored.',
      description: 'Keep exploring new meds.',
      status: 'info',
      duration: 2000,
      position: 'bottom-left',
      isClosable: true,
    });
  };

  return (
    <Card>
      <CardBody>
        <Text>Brand Name: {nameBrand}</Text>
        <Text>Generic Name: {nameGeneric}</Text>
        <Text margin={1} fontSize="smaller">
          Drug Class: {drugClass}
        </Text>
        <Text margin={1} fontSize="small">
          Also Treats: {prescribedFor}
        </Text>
        <Text margin={4} fontSize="small">
          Common Side Effects: {sideEffects}
        </Text>
        <Center>
          <Image
            src={image}
            alt={nameGeneric}
            boxSize="150px"
            borderRadius="full"
            padding={2}
          />
        </Center>
        <Flex display={'block'}>
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

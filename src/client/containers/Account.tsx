//displays account information
import React, { useEffect, useState } from 'react';

import {
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';

import { get, patch, remove } from '../api';
import { useAuth } from '../AuthProvider';
import EmailForm from '../components/EmailForm';
import Link from '../components/Link';
import type { EmailFormValues } from '../components/EmailForm';
import type { User } from '../types';

function Account() {
  const { currentUser } = useAuth();
  const [accountData, setAccountData] = useState<User | null>(null);
  const navigate = useNavigate();
  const toast = useToast();

  console.log('load account with id:', currentUser);

  useEffect(() => {
    if (!currentUser) return;

    get(`/api/users/${currentUser.uid}`, true).then((user: User) => {
      setAccountData(user);
    });
  }, [currentUser]);

  console.log('account data:', accountData);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (!accountData) return null;

  const addEmail = async (newEmail: EmailFormValues) => {
    const updated = await patch(
      `/api/users/${currentUser.uid}`,
      newEmail,
      true,
    );

    setAccountData((prevAccount) => ({
      ...prevAccount,
      ...updated,
    }));
    toast({
      title: 'Email updated.',
      description: 'Thanks for updating your account!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteAccount = async () => {
    const shouldDelete = window.confirm('Are you sure you want to delete?');

    if (!shouldDelete) return;

    try {
      await remove(`/api/users/${currentUser.uid}`, true);
      alert('Delete successful');
      navigate('/');
    } catch (e: any) {
      console.error('Error deleting account:', e);
      alert('Error deleting account!');
    }
  };

  const handleUnFaveClick = async (medicationId: number) => {
    try {
      // TODO: refactor for new faves api
      await remove(`/api/faves/${medicationId}`, true);
      toast({
        title: 'Medication Unfaved.',
        description: 'Thank you for updating your faves!',
        status: 'info',
        duration: 2000,
        position: 'bottom-left',
        isClosable: true,
      });
      setAccountData({
        ...accountData,
        faves: accountData.faves?.filter(
          (fave) => fave.medication.id !== medicationId,
        ),
      });
    } catch (e: any) {
      console.error('Error deleting fave', e);
    }
  };

  return (
    <Stack>
      <Heading margin={2} align="center" as="h1">
        Welcome to your account page, {accountData.name}!
      </Heading>
      <Text align="center">
        Your current account email is: {accountData.email}
      </Text>{' '}
      <EmailForm addEmail={addEmail} email={accountData.email} />
      {accountData.faves?.length ? (
        <>
          <Text align="center">Your faved meds are: </Text>
          <Center>
            <ul>
              {accountData.faves.map((fave) => (
                <li key={fave.medication.id}>
                  <Link to={`/medications/${fave.medication.id}`}>
                    {fave.medication.nameGeneric} ({fave.medication.nameBrand})
                  </Link>{' '}
                  <Button
                    mt={0}
                    colorScheme="teal"
                    size="xs"
                    className="unFave"
                    onClick={() => handleUnFaveClick(fave.medication.id)}
                  >
                    Unfave Med
                  </Button>
                </li>
              ))}
            </ul>
          </Center>
        </>
      ) : (
        <Text align="center">
          You don't have any faved meds yet- want to check out{' '}
          <Link to="/conditions/">some conditions?</Link>
        </Text>
      )}
      <Center>
        <Button
          margin={3}
          colorScheme="pink"
          width={150}
          size="s"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </Button>
      </Center>
    </Stack>
  );
}

export default Account;

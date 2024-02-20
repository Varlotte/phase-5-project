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
import { GoShieldX } from 'react-icons/go';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { Navigate, useNavigate } from 'react-router-dom';

import { get, patch, remove } from '../api';
import { useAuth } from '../AuthProvider';
import EmailForm from '../components/EmailForm';
import Link from '../components/Link';
import type { EmailFormValues } from '../components/EmailForm';
import type { User } from '../types';

function Account() {
  const {
    currentUser,
    updateAccount,
    deleteAccount,
    logout,
    sendEmailVerification,
  } = useAuth();
  const [accountData, setAccountData] = useState<User | null>(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!currentUser) return;

    get(`/api/users/${currentUser.uid}`, true).then((user: User) => {
      setAccountData(user);
    });
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (!accountData) return null;

  const addEmail = async (newEmail: EmailFormValues) => {
    // When changing an email, we have to update it in both Firebase and
    // our own database.
    try {
      await updateAccount(currentUser, { email: newEmail.email });
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
        title: 'Email updated',
        description: 'Thanks for updating your account!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (e: any) {
      console.error(
        `Cannot update email from ${currentUser.email} to ${newEmail.email}: ${e.message}`,
      );
      toast({
        title: 'Error updating email',
        description: `Cannot update email: ${e.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteAccount = async () => {
    const shouldDelete = window.confirm('Are you sure you want to delete?');

    if (!shouldDelete) return;

    try {
      // When deleting an account, we want to remove it from Firebase and
      // our own database, then log the user out.
      await remove(`/api/users/${currentUser.uid}`, true);
      await deleteAccount(currentUser);
      await logout();
      toast({
        title: 'Account deleted',
        description: "We'll miss you!",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (e: any) {
      console.error('Error deleting account:', e);
      toast({
        title: 'Error deleting account',
        description: `Cannot delete account: ${e.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUnFaveClick = async (medicationId: number) => {
    try {
      await patch(
        `/api/users/${currentUser.uid}`,
        {
          faves: {
            update: {
              where: {
                userUid_medicationId: {
                  userUid: currentUser.uid,
                  medicationId,
                },
              },
              data: {
                unfavedOn: new Date(),
              },
            },
          },
        },
        true,
      );
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
      console.error(`Error removing fave: ${e.message}`);
      toast({
        title: 'Error removing fave',
        description: 'Please refresh and try again!',
        status: 'error',
        duration: 2000,
        position: 'bottom-left',
        isClosable: true,
      });
    }
  };

  const verifyEmail = async () => {
    await sendEmailVerification(currentUser);
    toast({
      title: 'Email Verification sent',
      description: 'Please check your email and click the link to verify',
      status: 'success',
      duration: 2000,
    });
  };

  return (
    <Stack>
      <Heading margin={2} align="center" as="h1">
        Welcome to your account page, {accountData.name}!
      </Heading>
      <Text align="center">
        Your current account email is: {accountData.email}
      </Text>{' '}
      <Text align="center">
        {currentUser.emailVerified ? (
          <span>
            <MdOutlineVerifiedUser
              color="green"
              style={{ display: 'inline-block', marginRight: '5px' }}
            />
            Email is <strong>verified</strong>
          </span>
        ) : (
          <span>
            <GoShieldX
              color="red"
              style={{ display: 'inline-block', marginRight: '5px' }}
            />
            Email is <strong>not verified</strong>.{' '}
            <Button variant="link" onClick={verifyEmail}>
              Send verification email?
            </Button>
          </span>
        )}
      </Text>
      <EmailForm
        addEmail={addEmail}
        email={accountData.email}
        isVerified={currentUser.emailVerified}
      />
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

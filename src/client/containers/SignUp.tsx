import React, { useContext, useEffect } from 'react';

import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { omit } from 'lodash';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../AuthProvider';
import Link from '../components/Link';

type FormValues = {
  name: string;
  email: string;
  password: string;
  birthday: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { currentUser, createAccount } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  useEffect(() => {
    // If the user is already logged in, redirect them to their account page.
    if (currentUser) navigate('/account');
  }, [currentUser, navigate]);

  async function onSubmit(values: FormValues) {
    try {
      const user = await createAccount(values.email, values.password);
      console.log('created account for', user);
      // TODO: get some data to link firebase and db accounts
      // - pass that data to db when creating a user
      // - remove password from db
      // - login and logout should go through firebase
      // - all authenticated api calls need current user token
      // - make sure signup form is disabled when submitting (prevent double user creation)
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(omit(values, ['email', 'password'])),
      });
      const json = await res.json();

      if (json.id) {
        navigate('/account');
      } else {
        throw new Error('Cannot create account!');
      }
    } catch (e: any) {
      alert(`Unable to create account: ${e.message}`);
    }
  }

  return (
    <Center>
      <Stack spacing={2}>
        <Heading as="h1">Create An Account</Heading>
        <Center>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt={3} isInvalid={errors.name}>
              <FormLabel htmlFor="name" textAlign={'center'}>
                Name:
              </FormLabel>
              <Input
                id="name"
                placeholder="name"
                {...register('name', {
                  required: 'This is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be longer than two characters!',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={errors.email}>
              <FormLabel htmlFor="email" textAlign={'center'}>
                Email Address:
              </FormLabel>
              <Input
                id="email"
                placeholder="email address"
                {...register('email', {
                  required: 'This is required',
                  pattern: {
                    value: /.+@.+/,
                    message: 'Make sure to enter a valid email!',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={errors.password}>
              <FormLabel htmlFor="password" textAlign={'center'}>
                Password:
              </FormLabel>
              <Input
                id="password"
                placeholder="password"
                type="password"
                {...register('password', {
                  required: 'This is required',
                  minLength: {
                    value: 12,
                    message: 'Password must be longer than 12 characters!',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={errors.birthday}>
              <FormLabel htmlFor="birthday" textAlign={'center'}>
                Birthday:
              </FormLabel>
              <Input
                id="birthday"
                placeholder="birthday"
                type="date"
                {...register('birthday', {
                  required: 'This is required',
                })}
              />
              <FormErrorMessage>
                {errors.birthday && errors.birthday.message}
              </FormErrorMessage>
            </FormControl>
            <Center>
              <Button
                mt={5}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Center>
          </form>
        </Center>
        <Text>
          Already have an account? Log in <Link to="/login">here!</Link>
        </Text>
      </Stack>
    </Center>
  );
}

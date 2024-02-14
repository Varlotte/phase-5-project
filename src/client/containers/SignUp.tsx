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

import { post } from '../api';
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
  const { currentUser, createAccount, updateAccount } = useAuth();
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
      // Create user account in firebase.
      const user = await createAccount(values.email, values.password);
      // Add their name to firebase.
      await updateAccount(user, { name: values.name });
      // Then create the user in our database.
      await post(
        '/api/users',
        {
          uid: user.uid,
          name: values.name,
          email: values.email,
          birthday: values.birthday,
        },
        true,
      );
      navigate('/account');
    } catch (e: any) {
      console.error(
        'Unable to create account:',
        omit(values, ['password']),
        e.message,
      );
      alert('Unable to create account!');
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

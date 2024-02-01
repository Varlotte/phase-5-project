import React, { useEffect } from 'react';

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
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../AuthProvider';
import Link from '../components/Link';

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { currentUser, login } = useAuth();
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
      await login(values.email, values.password);
      navigate('/account');
    } catch (e: any) {
      alert(`Login failed: ${e.message}`);
    }
  }

  return (
    <Center>
      <Stack spacing={2}>
        <Heading align="center" as="h1">
          Login
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Center>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Center>
        </form>
        <Text>
          Don't have an account yet? Make one <Link to="/signup">here!</Link>
        </Text>
      </Stack>
    </Center>
  );
}

import React, { useState } from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Stack,
  Text,
  Center,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function EmailForm({ addEmail, email }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: email },
  });

  return (
    <Stack align="center" margin={2} spacing={4}>
      <Text fontWeight={"bold"}>Update your email:</Text>
      <form
        onSubmit={handleSubmit((values) => {
          addEmail(values);
        })}
      >
        <FormControl mt={0} isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input
            id="email"
            placeholder="email address"
            {...register("email", {
              required: "This is required",
              pattern: {
                value: /.+@.+/,
                message: "Make sure to enter a valid email!",
              },
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <Center>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Update
          </Button>
        </Center>
      </form>
    </Stack>
  );
}

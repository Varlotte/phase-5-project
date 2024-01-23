import React, { useContext } from "react";
import { CurrentUserContext } from "../utils";
import { useForm } from "react-hook-form";
import Link from "./Link";
import { useHistory } from "react-router-dom";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Stack,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";

export default function Login() {
  const history = useHistory();
  const { setCurrentUser } = useContext(CurrentUserContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          window.sessionStorage.setItem("currentUser", data.id);
          setCurrentUser(data.id);
          //this passes current user to context
          //sets current logged in user id so any other component can use it
          //user id for the rest of the app is going to be sessionStorage.getItem('currentUser')
          history.push("/account");
        } else {
          alert("Unable to create account.");
        }
      });
  }

  return (
    <Center>
      <Stack spacing={2}>
        <Heading as="h1">Create An Account</Heading>
        <Center>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt={3} isInvalid={errors.name}>
              <FormLabel htmlFor="name" textAlign={"center"}>
                Name:
              </FormLabel>
              <Input
                id="name"
                placeholder="name"
                {...register("name", {
                  required: "This is required",
                  minLength: {
                    value: 2,
                    message: "Name must be longer than two characters!",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={errors.email}>
              <FormLabel htmlFor="email" textAlign={"center"}>
                Email Address:
              </FormLabel>
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

            <FormControl mt={4} isInvalid={errors.password}>
              <FormLabel htmlFor="password" textAlign={"center"}>
                Password:
              </FormLabel>
              <Input
                id="password"
                placeholder="password"
                type="password"
                {...register("password", {
                  required: "This is required",
                  minLength: {
                    value: 12,
                    message: "Password must be longer than 12 characters!",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={errors.birthday}>
              <FormLabel htmlFor="birthday" textAlign={"center"}>
                Birthday:
              </FormLabel>
              <Input
                id="birthday"
                placeholder="birthday"
                type="date"
                {...register("birthday", {
                  required: "This is required",
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

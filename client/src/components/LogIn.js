import React, { useState, useContext } from "react";
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
    fetch("http://127.0.0.1:5555/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: "cors",
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
          alert("Login failed.");
        }
      });
  }

  return (
    <Center>
      <Stack spacing={4}>
        <Heading align="center" as="h1">
          Login
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mt={3} isInvalid={errors.email}>
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

          <FormControl mt={3} isInvalid={errors.password}>
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

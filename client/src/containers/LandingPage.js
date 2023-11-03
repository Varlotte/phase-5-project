//displays either login or signup
import React from "react";
import Link from "../components/Link";
import { Heading, Text, Stack } from "@chakra-ui/react";

function LandingPage() {
  return (
    <Stack spacing={3} align="center">
      <Heading margin={2} as="h1">
        Welcome to RXGnosis
      </Heading>

      <Text margin={2} align="center">
        Did you know most doctor's appointments only last 17 minutes? That's not
        a lot of time to make life-changing care decisions.
      </Text>
      <Text margin={2} align="center">
        <Link to="/signup">Make a secure account</Link> on our platform to be
        your own best advocate and make the most of your doctor's appointment.{" "}
      </Text>

      <Text>
        Already got an account? <Link to="/login"> Log in here!</Link>
      </Text>
    </Stack>
  );
}

export default LandingPage;

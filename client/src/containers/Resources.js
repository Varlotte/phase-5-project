//static page linking to sources
import React from "react";
import Link from "../components/Link";
import { Heading, Text, Stack } from "@chakra-ui/react";

function Resources() {
  return (
    <Stack spacing={3}>
      <Heading as="h1">Resources</Heading>

      <Text>
        Note: RXMatch is not a diagnostic tool. Only a professional can diagnose
        you. Please discuss all medications seen on RXGnosis with your provider.
        Not all medications have the same side effects for all people. For more
        medication information, including more detailed and updated side
        effects, please visit{" "}
        <Link href="http://www.medlineplus.gov">www.medlineplus.gov</Link>. From
        there, you can search for medications, conditions, and treatments in
        greater detail.
      </Text>
      <Text>
        All information available on RXMatch was made available through Medline
        Plus, a free public health information resource for patients and
        providers from the National Library of Medicine, a subsidiary of the
        National Institutes of Health.
      </Text>
      <Text>
        Reliable public health information is out there- RXGnosis recommends
        using tools from the NLM, NIH, and FDA. Don't use WebMd!
      </Text>
      <Text>
        Are you a developer looking for free public health databases? Check out{" "}
        <Link href="https://www.lhncbc.nlm.nih.gov/RxNav/APIs/">
          the National Library of Medicine's public APIs.
        </Link>
      </Text>
    </Stack>
  );
}

export default Resources;

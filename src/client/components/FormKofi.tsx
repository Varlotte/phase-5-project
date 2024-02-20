import React from 'react';

import {
  Box,
  Link as ChakraLink,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

import Link from '../components/Link';

export default function FormKofi() {
  return (
    <Box bg="#E6FFFA" w="100%" p={7} color="white" marginTop={5}>
      <Stack spacing={1}>
        <Text fontSize="xs" align="center" color="black">
          This tool was made by{' '}
          <Link href="https://femmefaust.us/dev">Charlotte Bush</Link> and{' '}
          <Link href="https://nelson.codes"> Nelson Pecora</Link>. If you like
          it, please consider throwing us a few bucks{' '}
          <Link href="ko-fi">here.</Link> Report bugs and request features{' '}
          <Link href="form">here!</Link> Thank you!
        </Text>
      </Stack>
    </Box>
  );
}

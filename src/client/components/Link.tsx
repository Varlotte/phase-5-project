import React, { ReactNode } from 'react';

import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

type LinkProps = {
  to?: string;
  children: ReactNode;
  href?: string;
};

export default function Link({ to, children, href }: LinkProps) {
  if (href)
    return (
      <ChakraLink href={href} target="_blank">
        {children}
      </ChakraLink>
    );

  return (
    <ChakraLink as={ReactRouterLink} to={to}>
      {children}
    </ChakraLink>
  );
}

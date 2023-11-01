import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

export default function Link({ to, children, href }) {
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

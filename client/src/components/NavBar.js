import React, { useContext } from "react";
import Link from "./Link";
import { CurrentUserContext } from "../utils";
import { Flex } from "@chakra-ui/react";

function NavBar() {
  //session storage or usecontext here for curr user
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <Flex
      as="nav"
      className="page-wrapper"
      align="center"
      justify="center"
      gap="4"
    >
      <Link to="/">RXGnosis Home</Link>
      <Link to="/conditions">Conditions</Link>

      {!currentUser ? (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </>
      ) : (
        <>
          <Link to="/account"> My Account</Link>
          <Link to="/logout">Log Out</Link>
        </>
      )}
      <Link to="/resources">Resources</Link>
    </Flex>
  );
}

export default NavBar;

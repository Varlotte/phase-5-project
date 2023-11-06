import React, { useContext } from "react";
import Link from "./Link";
import { CurrentUserContext } from "../utils";
import { Flex } from "@chakra-ui/react";
import MedSearch from "./MedSearch";

function NavBar() {
  //session storage or usecontext here for curr user
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <Flex
      as="nav"
      className="page-wrapper"
      align="center"
      justify="center"
      gap="3"
    >
      <Link to="/">Home</Link>
      <Link to="/conditions">Conditions</Link>

      {!currentUser ? (
        <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      ) : (
        <>
          <Link to="/account">Account</Link>
          <Link to="/logout">Logout</Link>
        </>
      )}
      <Link to="/resources">Resources</Link>
      <MedSearch></MedSearch>
    </Flex>
  );
}

export default NavBar;

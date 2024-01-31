import React, { useContext } from 'react';

import { Flex } from '@chakra-ui/react';

import { useAuth } from '../AuthProvider';
import Link from './Link';
import Logo from './Logo';
import MedSearch from './MedSearch';

function NavBar() {
  const { currentUser } = useAuth();
  return (
    <Flex
      as="nav"
      className="page-wrapper"
      align="center"
      justify="center"
      gap="3"
    >
      <Link to="/">
        <Logo />
      </Link>
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

import React from 'react';

import { Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Logo() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }

  return (
    <Image
      src="https://i.imgur.com/9STeZUW.png"
      alt="logo"
      boxSize="60px"
      m={'-10px auto'}
      onClick={handleClick}
    />
  );
}

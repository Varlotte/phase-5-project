import React from "react";
import { useHistory } from "react-router-dom/";
import { Image } from "@chakra-ui/react";

export default function Logo() {
  const history = useHistory();

  function handleClick() {
    history.push("/");
  }
  return (
    <Image
      src="https://i.imgur.com/9STeZUW.png"
      alt="logo"
      boxSize="60px"
      m={"-10px auto"}
      onClick={handleClick}
    />
  );
}

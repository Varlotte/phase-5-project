//displays account information
import React, { useEffect, useState, createContext, useContext } from "react";
import { getCurrUser, setCurrentUser } from "../utils";
import { Redirect } from "react-router-dom";
import { CurrentUserContext } from "../utils";

function Account() {
  const { currentUser } = useContext(CurrentUserContext);
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    if (!currentUser) return;
    fetch(`/users/${currentUser}`, { credentials: "include", mode: "cors" })
      .then((r) => r.json())
      .then((user) => {
        setAccountData(user);
      });
  }, [currentUser]);

  console.log(accountData);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  if (!accountData) return null;

  return <div>This is my account email = {accountData.email}</div>;
}

export default Account;

//displays account information
import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { CurrentUserContext } from "../utils";

function Account() {
  const { currentUser } = useContext(CurrentUserContext);
  const [accountData, setAccountData] = useState(null);

  console.log("load account with id:", currentUser);

  useEffect(() => {
    if (!currentUser) return;
    fetch(`http://127.0.0.1:5555/users/${currentUser}`, {
      credentials: "include",
      mode: "cors",
    })
      .then((r) => r.json())
      .then((user) => {
        setAccountData(user);
      });
  }, [currentUser]);

  console.log("account data:", accountData);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  if (!accountData) return null;

  return <div>This is my account email = {accountData.email}</div>;
}

export default Account;

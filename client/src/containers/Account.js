//displays account information
import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { CurrentUserContext } from "../utils";
import EmailForm from "../components/EmailForm";

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

  const addEmail = (newEmail) => {
    fetch(`http://127.0.0.1:5555/users/${currentUser}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmail),
      credentials: "include",
      mode: "cors",
    })
      .then((r) => r.json())
      .then((data) => {
        setAccountData((prevAccount) => ({
          ...prevAccount,
          ...data,
        }));
      });
  };

  return (
    <div>
      <h1>Welcome to your account page!</h1>
      <p>Your account email is: {accountData.email}</p>{" "}
      <EmailForm addEmail={addEmail} />
      <p>Your faved meds are: {accountData.faves}</p>
      <button>Delete Account</button>
    </div>
  );
}

export default Account;

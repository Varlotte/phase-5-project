//displays account information
import React, { useEffect, useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { CurrentUserContext, clearCurrentUser } from "../utils";
import EmailForm from "../components/EmailForm";

function Account() {
  const { currentUser } = useContext(CurrentUserContext);
  const [accountData, setAccountData] = useState(null);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const history = useHistory();

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

  const handleDeleteAccount = () => {
    console.log(currentUser);
    fetch(`http://127.0.0.1:5555/users/${currentUser}`, {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
    })
      .then(() => alert("Delete successful"))
      .catch((error) => console.error("Error deleting account:", error));
    setCurrentUser(null);
    clearCurrentUser();
    history.push("/");
  };

  return (
    <div>
      <h1>Welcome to your account page!</h1>
      <p>Your account email is: {accountData.email}</p>{" "}
      <EmailForm addEmail={addEmail} />
      <p>Your faved meds are: {accountData.faves}</p>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
}

export default Account;

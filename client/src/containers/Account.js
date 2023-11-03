//displays account information
import React, { useEffect, useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { CurrentUserContext, clearCurrentUser } from "../utils";
import EmailForm from "../components/EmailForm";
import Link from "../components/Link";
import { Heading, Text, Stack, Button, Center } from "@chakra-ui/react";

function Account() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [accountData, setAccountData] = useState(null);
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
    const shouldDelete = window.confirm("Are you sure you want to delete?");

    if (!shouldDelete) return;
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

  const handleUnFaveClick = (faveId) => {
    console.log("UnFaved");
    fetch(`http://127.0.0.1:5555/faves/${faveId}`, {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
    })
      .then(() => alert("unfave successful"))
      .then(() => {
        setAccountData((prevAccount) => ({
          ...prevAccount,
          faves: prevAccount.faves.filter((fave) => fave.id !== faveId),
        }));
      })
      .catch((error) => console.error("Error deleting fave", error));
  };

  return (
    <Stack>
      <Heading margin={2} align="center" as="h1">
        Welcome to your account page, {accountData.name}!
      </Heading>
      <Text align="center">
        Your current account email is: {accountData.email}
      </Text>{" "}
      <EmailForm align="center" addEmail={addEmail} email={accountData.email} />
      {accountData.faves?.length ? (
        <>
          <Text align="center">Your faved meds are: </Text>
          <Center>
            <ul>
              {accountData.faves.map((fave) => (
                <li key={fave.medication.id}>
                  <Link to={`/medications/${fave.medication.id}`}>
                    {fave.medication.name_generic}
                  </Link>{" "}
                  <Button
                    mt={0}
                    colorScheme="teal"
                    size="xs"
                    className="unFave"
                    onClick={() => handleUnFaveClick(fave.id)}
                  >
                    Unfave Med
                  </Button>
                </li>
              ))}
            </ul>
          </Center>
        </>
      ) : (
        <Text align="center">
          You don't have any faved meds yet- want to check out{" "}
          <Link to="/conditions/">some conditions?</Link>
        </Text>
      )}
      <Center>
        <Button
          margin={3}
          colorScheme="pink"
          width={150}
          size="s"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </Button>
      </Center>
    </Stack>
  );
}

export default Account;

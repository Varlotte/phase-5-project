//this will display on logout
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CurrentUserContext, clearCurrentUser } from "../utils";

export default function Logout() {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const history = useHistory();

  useEffect(() => {
    fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then(() => {
      setCurrentUser(null);
      clearCurrentUser();
      history.push("/");
    });
  }, []);

  return (
    <div>
      <p>Logging you out!</p>
    </div>
  );
}

import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import Conditions from "./Conditions";
import Account from "./Account";
import Resources from "./Resources";
import RXMatch from "./RXMatch";
import NavBar from "../components/NavBar";
import Login from "../components/LogIn";
import Logout from "./Logout";
import SignUp from "../components/SignUp";
import { CurrentUserContext } from "../utils";

function App() {
  const [currentUser, setCurrentUser] = useState(
    parseInt(window.sessionStorage.getItem("currentUser"))
  );
  return (
    <div>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <h1>Project!</h1>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path="/conditions/:id">
              <RXMatch />
            </Route>
            <Route path="/conditions">
              <Conditions />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/resources">
              <Resources />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </CurrentUserContext.Provider>
    </div>
  );
}

//router info here

export default App;

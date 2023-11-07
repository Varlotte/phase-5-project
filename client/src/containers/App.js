import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ChakraProvider, Image } from "@chakra-ui/react";

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
import MedicationPage from "./MedicationPage";
import SearchPage from "./SearchPage";

function App() {
  const [currentUser, setCurrentUser] = useState(
    parseInt(window.sessionStorage.getItem("currentUser"))
  );

  return (
    <ChakraProvider>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <BrowserRouter>
          <NavBar />
          <main className="page-wrapper">
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
              <Route path="/medications/:id">
                <MedicationPage />
              </Route>
              <Route path="/medications">
                <SearchPage />
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
          </main>
        </BrowserRouter>
      </CurrentUserContext.Provider>
    </ChakraProvider>
  );
}

//router info here

export default App;

import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

import LandingPage from "./LandingPage";
import Conditions from "./Conditions";
import Account from "./Account";
import Resources from "./Resources";
import RXMatch from "./RXMatch";
import NavBar from "../components/NavBar";
import Login from "../components/LogIn";

function App() {
  return (
    <div>
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
          <Route path="/resources">
            <Resources />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

//router info here

export default App;

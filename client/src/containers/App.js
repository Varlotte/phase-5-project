import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

import LandingPage from "./LandingPage";
import Conditions from "./Conditions";
import Account from "./Account";
import Resources from "./Resources";
import RXMatch from "./RXMatch";

function App() {
  return (
    <div>
      <h1>Project!</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/conditions:id">
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

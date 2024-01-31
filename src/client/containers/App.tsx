import React, { useState } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from '../components/LogIn';
import NavBar from '../components/NavBar';
import SignUp from '../components/SignUp';
import { CurrentUserContext, getCurrentUser } from '../utils';
import Account from './Account';
import Conditions from './Conditions';
import LandingPage from './LandingPage';
import Logout from './Logout';
import MedicationPage from './MedicationPage';
import Resources from './Resources';
import RXMatch from './RXMatch';
import SearchPage from './SearchPage';

function App() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

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
            <Routes>
              <Route path="/conditions/:id" element={<RXMatch />} />
              <Route path="/conditions" element={<Conditions />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/medications/:id" element={<MedicationPage />} />
              <Route path="/medications" element={<SearchPage />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/account" element={<Account />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </CurrentUserContext.Provider>
    </ChakraProvider>
  );
}

//router info here

export default App;

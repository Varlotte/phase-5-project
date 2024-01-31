import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '../AuthProvider';
import NavBar from '../components/NavBar';
import Account from './Account';
import Conditions from './Conditions';
import LandingPage from './LandingPage';
import Login from './LogIn';
import Logout from './Logout';
import MedicationPage from './MedicationPage';
import Resources from './Resources';
import RXMatch from './RXMatch';
import SearchPage from './SearchPage';
import SignUp from './SignUp';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
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
      </AuthProvider>
    </ChakraProvider>
  );
}

//router info here

export default App;

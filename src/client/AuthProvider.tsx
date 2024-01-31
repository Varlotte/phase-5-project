import React, { createContext, useContext, useEffect, useState } from 'react';

import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import type { ReactNode } from 'react';

import firebaseConfig from './firebase.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function createAccount(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  return userCredential.user;
}

async function login(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  return userCredential.user;
}

type AuthContextType = {
  currentUser: User | null;
  createAccount: typeof createAccount;
  login: typeof login;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  createAccount,
  login,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    createAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

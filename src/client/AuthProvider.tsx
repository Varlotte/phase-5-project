import React, { createContext, useContext, useEffect, useState } from 'react';

import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updateProfile,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import type { ReactNode } from 'react';

// Initialize Firebase
const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE__AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
});
export const auth = getAuth(app);

async function createAccount(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return userCredential.user;
  } catch (e: any) {
    // Handle specific errors from firebase, rethrowing them with messages
    // we can pass along to users.
    // https://firebase.google.com/docs/reference/node/firebase.auth.Auth#createuserwithemailandpassword
    if (e.code === 'auth/email-already-in-use') {
      throw new Error('Email already in use!');
    } else if (e.code === 'auth/invalid-email') {
      throw new Error('Email is invalid!');
    } else if (e.code === 'auth/weak-password') {
      throw new Error('Password is not strong enough!');
    } else {
      throw new Error(e.message);
    }
  }
}

type UpdateFirebaseProfile = {
  /** Updating name will call updateProfile() in Firebase. */
  name?: string;
  /** Updating email will call updateEmail() in Firebase. */
  email?: string;
};

async function updateAccount(user: User, account: UpdateFirebaseProfile) {
  if (account.name) {
    await updateProfile(user, { displayName: account.name });
  } else if (account.email) {
    await updateEmail(user, account.email);
  }
}

async function deleteAccount(user: User) {
  await deleteUser(user);
}

async function login(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return userCredential.user;
  } catch (e: any) {
    // Handle specific errors from firebase, rethrowing them with messages
    // we can pass along to users.
    // https://firebase.google.com/docs/reference/node/firebase.auth.Auth#signinwithemailandpassword
    if (
      [
        'auth/user-disabled',
        'auth/invalid-email',
        'auth/user-not-found',
      ].includes(e.code)
    ) {
      // We want to show the same error for invalid emails as well as if
      // the user has been disabled or doesn't exist, because otherwise someone
      // could probe our login to get a list of current users.
      throw new Error('Email is invalid!');
    } else if (e.code === 'auth/wrong-password') {
      throw new Error('Password is incorrect!');
    } else {
      throw new Error(e.message);
    }
  }
}

async function logout() {
  await signOut(auth);
}

type AuthContextType = {
  currentUser: User | null;
  createAccount: typeof createAccount;
  updateAccount: typeof updateAccount;
  deleteAccount: typeof deleteAccount;
  login: typeof login;
  logout: typeof logout;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  createAccount,
  updateAccount,
  deleteAccount,
  login,
  logout,
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

  const value: AuthContextType = {
    currentUser,
    createAccount,
    updateAccount,
    deleteAccount,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

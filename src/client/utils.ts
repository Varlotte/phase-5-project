import { createContext } from 'react';

import { CurrentUser } from './types';

export function getCurrentUser() {
  const storedUser = window.sessionStorage.getItem('currentUser');

  return storedUser ? parseInt(storedUser) : null;
}

export const CurrentUserContext = createContext<CurrentUser>({
  currentUser: getCurrentUser(),
  setCurrentUser: () => {},
});

export function clearCurrentUser() {
  window.sessionStorage.removeItem('currentUser');
}

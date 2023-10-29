import { createContext } from "react";

export function getCurrUser() {
  return window.sessionStorage.getItem("currentUser");
}

export const CurrentUserContext = createContext(
  window.sessionStorage.getItem("currentUser")
);

export function clearCurrentUser() {
  window.sessionStorage.removeItem("currentUser");
}

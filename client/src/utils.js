import { createContext } from "react";

export const CurrentUserContext = createContext(
  window.sessionStorage.getItem("currentUser")
);

export function clearCurrentUser() {
  window.sessionStorage.removeItem("currentUser");
}

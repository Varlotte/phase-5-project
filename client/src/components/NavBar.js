import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../utils";

function NavBar() {
  //session storage or usecontext here for curr user
  const { currentUser } = useContext(CurrentUserContext);
  const navBarStyle = {
    padding: "14px",
    height: "60px",
    display: "flex",
    gap: "25px",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  };
  return (
    <div className="navbar" style={navBarStyle}>
      <Link to="/">RXGnosis Home</Link>
      <Link to="/conditions">Conditions</Link>

      {!currentUser ? (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </>
      ) : (
        <>
          <Link to="/account"> My Account</Link>
          <Link to="/logout">Log Out</Link>
        </>
      )}
      <Link to="/resources">Resources</Link>
    </div>
  );
}

export default NavBar;

import React, { useContext } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  //session storage or usecontext here for curr user
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
      <Link to="/conditions">Conditions</Link>
      <Link to="/signup">Sign Up</Link>
      {/* {!currentUser ? (
        <Link to="/login">Log In</Link>
      ) : (
        <Link to="/account"> My Account</Link>
      )} */}
      <Link to="/login">Log In</Link>
      <Link to="/account">Account</Link>
      <Link to="/logout">Log Out</Link>
    </div>
  );
}

export default NavBar;

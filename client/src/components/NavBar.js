import React, { useContext } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  //session storage or usecontext here for curr user
  return (
    <div className="navbar">
      <Link className="font-bold" to="/conditions">
        Conditions
      </Link>
      <Link to="/">Sign Up</Link>
      {/* {!currentUser ? (
        <Link to="/login">Log In</Link>
      ) : (
        <Link to="/account"> My Account</Link>
      )} */}
      <Link to="/account">Account</Link>
    </div>
  );
}

export default NavBar;

//displays either login or signup
import React, { useEffect, useState, createContext } from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <h1>Welcome to RXGnosis</h1>
      <p>Did you know most doctor's appointments only last 17 minutes?</p>
      <p>
        <Link to="/signup">Make a secure account</Link> on our platform to be
        your own best advocate and make the most of your doctor's appointment.
        Already got an account? <Link to="/login"> Log in here!</Link>
      </p>
    </div>
  );
}

export default LandingPage;

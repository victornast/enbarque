import { Link } from 'react-router-dom';
import React from 'react';

function Homepage() {
  return (
    <>
      <h2>Your path to a successful onboarding.</h2>
      <p>
        Log in to follow up on your onboarding plan, or Sign up to
        register a new organization.
      </p>
      <Link
        className="eb-button eb-button--secondary"
        to="/auth/signup"
      >
        Sign Up
      </Link>
      <Link className="eb-button eb-button--primary" to="/auth/signin">
        Log In
      </Link>
    </>
  );
}

export default Homepage;

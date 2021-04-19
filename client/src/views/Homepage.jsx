import { Link } from 'react-router-dom';
import React from 'react';

import './Homepage.scss';

function Homepage() {
  return (
    <section className="eb-homepage">
      <h2 className="eb-homepage__headline">
        Your path to a successful onboarding.
      </h2>
      <p className="eb-homepage__intro eb-intro">
        Log in to follow up on your onboarding plan, or Sign up to
        register a new organization.
      </p>
      <div className="eb-homepage__actions eb-signin-up">
        <Link
          className="eb-signin-up__action eb-button eb-button--secondary"
          to="/auth/signup"
        >
          Sign Up
        </Link>
        <Link
          className="eb-signin-up__action eb-button eb-button--primary"
          to="/auth/signin"
        >
          Log In
        </Link>
      </div>
    </section>
  );
}

export default Homepage;

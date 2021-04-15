import React, { Component } from 'react';
import { signOut } from './../services/authentication';
import './../SignOut.scss';

const SignOut = ({ user, onSignOut }) => {
  return (
    <div className="signout-text">
      <h1>Are you sure you want to sign out?</h1>
      <button onClick={onSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;

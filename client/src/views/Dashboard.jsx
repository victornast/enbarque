import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ user }) {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div>
        <img
          src={user.avatar}
          alt={user.firstName + ' ' + user.lastName}
          height={50}
        />
        <span>Hello, {user.firstName}.</span>
      </div>
      <Link to="/onboarding/create">Create New Onboarding Plan</Link>
    </div>
  );
}

export default Dashboard;

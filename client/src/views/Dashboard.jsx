import React from 'react';
import { Link } from 'react-router-dom';

import OnboardeeDashboard from './../components/onboardee/OnboardeeDashboard';

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

      {/* Display only if onboardee */}
      <OnboardeeDashboard user={user} />
    </div>
  );
}

export default Dashboard;

import React from 'react';

import OnboardeeDashboard from './../components/onboardee/OnboardeeDashboard';

function Dashboard({ user }) {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Display only if onboardee */}
      <OnboardeeDashboard user={user} />
    </div>
  );
}

export default Dashboard;

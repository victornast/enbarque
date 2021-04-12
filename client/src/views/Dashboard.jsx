import React from 'react';

function Dashboard({ user }) {
  console.log(user);
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
    </div>
  );
}

export default Dashboard;

import React from 'react';

function Greeting({ user }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <img
        src={user.avatar}
        alt={user.firstName + ' ' + user.lastName}
        height={60}
      />
      <p>Hello, {user.firstName}.</p>
    </div>
  );
}

export default Greeting;

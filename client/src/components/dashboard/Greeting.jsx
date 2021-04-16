import React from 'react';

function Greeting({ user }) {
  return (
    <h2
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <img
        src={user.avatar}
        alt={user.firstName + ' ' + user.lastName}
        height={70}
      />
      <span>Hello, {user.firstName}.</span>
    </h2>
  );
}

export default Greeting;

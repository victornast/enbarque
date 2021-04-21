import React from 'react';
import './Greeting.scss';

function Greeting({ user }) {
  return (
    <section className="greeting">
      <h2 className="greeting__title greeting-title">
        <img
          className="greeting-title__avatar"
          src={user.avatar}
          alt={user.firstName + ' ' + user.lastName}
        />
        <span className="greeting-title__text">Hello, {user.firstName}.</span>
      </h2>
      {user.role.accessLevel === 1 && (
        <p className="greeting__intro">
          We are very happy to welcome you at XXX. Here is an overview of your
          onboarding plan for the next few weeks. Please approach your technical
          mentor for adjustments requests and use the feedback formular to send
          us suggestions regarding the process.
        </p>
      )}
    </section>
  );
}

export default Greeting;

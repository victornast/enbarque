import React from 'react';

import Greeting from './../dashboard/Greeting';

function OnboardeeDashboard({ user }) {
  return (
    <>
      <Greeting user={user} />
      <p>
        We are very happy to welcome you at XXX. Here is an overview of
        your onboarding plan for the next few weeks. Please approach
        your technical mentor for adjustments requests and use the
        feedback formular to send us suggestions regarding the process.
      </p>
    </>
  );
}

export default OnboardeeDashboard;

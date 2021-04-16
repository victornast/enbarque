import React from 'react';

import Greeting from './../dashboard/Greeting';

function OnboardeeDashboard({ user }) {
  return (
    <>
      <section>
        <Greeting user={user} />
        <p>
          We are very happy to welcome you at XXX. Here is an overview
          of your onboarding plan for the next few weeks. Please
          approach your technical mentor for adjustments requests and
          use the feedback formular to send us suggestions regarding the
          process.
        </p>
      </section>
      <section>
        <h2>Contact Persons</h2>
        <p>
          Here is an overview about your main contact persons during
          your onboarding. Of course you can always reach out to other
          colleagues as well when you feel stuck. Check our team channel
          on slack.
        </p>
        <div>
          Role Card: <div>User Card</div>
        </div>
        <div>
          Role Card: <div>User Card</div>
        </div>
      </section>
      <section>
        <h2>Onboarding Schedule</h2>
        <p>
          Calendar View of the weeks planned for the onboarding and the
          topics that should be followed each day.
        </p>
      </section>
    </>
  );
}

export default OnboardeeDashboard;

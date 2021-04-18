import React from 'react';
import { Card, CardDeck } from 'react-bootstrap';

import Greeting from './../dashboard/Greeting';

function OnboardeeDashboard({ user, onboarding }) {
  return (
    <>
      <section>
        <Greeting user={user} />
        <p>
          We are very happy to welcome you at XXX. Here is an overview of your
          onboarding plan for the next few weeks. Please approach your technical
          mentor for adjustments requests and use the feedback formular to send
          us suggestions regarding the process.
        </p>
      </section>
      <section>
        <h2>Contact Persons</h2>
        <p>
          Here is an overview about your main contact persons during your
          onboarding. Of course you can always reach out to other colleagues as
          well when you feel stuck. Check our team channel on slack.
        </p>
        <CardDeck>
          <Card border="warning">
            <Card.Header className="font-weight-bold">
              Your Onboarding Mentor:
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Will guide and support you through your onboarding process and
                help you find answers to your technical questions.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card border="warning">
            <Card.Header className="font-weight-bold">
              Your Engineering Manager: {user.firstName}
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Will provide you feedback and support you in your personal
                development path.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </section>
      <section>
        <h2>Onboarding Schedule</h2>
        <p>
          Calendar View of the weeks planned for the onboarding and the topics
          that should be followed each day.
        </p>
      </section>
      <section>
        <h2>Onboarding Backlog</h2>
        <p>
          Topics that couldn't be covered during the onboarding and should be
          approached as soon as possible in parallel with the projects, as part
          of the personal development plans.
        </p>
      </section>
      <section>
        <h2>Feedback Notes</h2>
        <p>
          Help us improve the onboarding process by adding here feedback notes
          and optimization suggestions:
        </p>
      </section>
    </>
  );
}

export default OnboardeeDashboard;

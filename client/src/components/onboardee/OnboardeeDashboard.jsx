import React, { useState, useEffect } from 'react';
import { Card, CardDeck } from 'react-bootstrap';

import Greeting from './../dashboard/Greeting';
import BacklogList from './BacklogList';
import WeekView from './WeekView';
import { getProcess } from './../../services/onboarding';
import { loadUser } from './../../services/user';

// import { getPositionOptions } from './../../services/userOptions';

import './OnboardeeDashboard.scss';

function OnboardeeDashboard({ user }) {
  const [process, setProcess] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchProcess = async (id) => {
      const singleProcess = await getProcess(id);
      setProcess(singleProcess);
    };
    fetchProcess(user._id);
  }, [user._id]);

  useEffect(() => {
    const fetchPosition = async (id) => {
      const singlePosition = await loadUser(id);
      setPosition(singlePosition);
    };
    fetchPosition(user._id);
  }, [user._id]);

  let weekViews;
  if (process) {
    console.log(process.amountOfDays);
    const amountOfWeeks = Math.ceil(process.amountOfDays / 5);
    weekViews = () => {
      for (let n = 0; n < amountOfWeeks; n++) {
        console.log('Week', n + 1);
        return <WeekView process={process} week={n + 1} />;
      }
    };
  }
  return (
    <article className="onboardee-dashboard">
      <Greeting user={user} />
      {process && (
        <>
          <section className="onboardee-dashboard__section onboardee-dashboard-section">
            <h2 className="onboardee-dashboard-section__headline">
              Contact Persons
            </h2>
            <p className="onboardee-dashboard-section__intro">
              Here is an overview about your main contact persons during your
              onboarding. Of course you can always reach out to other colleagues
              as well when you feel stuck. Check our team channel on slack.
            </p>
            <div className="onboardee-dashboard-section__body">
              <CardDeck>
                <Card border="warning">
                  <Card.Header user={user} className="font-weight-bold">
                    Your Onboarding Mentor:
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      Will guide and support you through your onboarding process
                      and help you find answers to your technical questions.
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card border="warning">
                  <Card.Header user={user} className="font-weight-bold">
                    Your Engineering Manager:
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      Will provide you feedback and support you in your personal
                      development path.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </CardDeck>
            </div>
          </section>
          <section className="onboardee-dashboard__section onboardee-dashboard-section">
            <h2 className="onboardee-dashboard-section__headline">
              Onboarding Schedule
            </h2>
            <p className="onboardee-dashboard-section__intro">
              Calendar View of the weeks planned for the onboarding and the
              topics that should be followed each day.
            </p>
            <div className="onboardee-dashboard-section__body">
              <p>Include here the calendar component</p>
              {weekViews()}
            </div>
          </section>
          <section className="onboardee-dashboard__section onboardee-dashboard-section">
            <h2 className="onboardee-dashboard-section__headline">
              Onboarding Backlog
            </h2>
            <p className="onboardee-dashboard-section__intro">
              Topics that couldn't be covered during the onboarding and should
              be approached as soon as possible in parallel with the projects,
              as part of the personal development plans.
            </p>
            <div className="onboardee-dashboard-section__body">
              <BacklogList
                process={process}
                onUpdate={(newProcess) => setProcess(newProcess)}
              />
            </div>
          </section>
          <section className="onboardee-dashboard__section onboardee-dashboard-section">
            <h2 className="onboardee-dashboard-section__headline">
              Feedback Notes
            </h2>
            <p className="onboardee-dashboard-section__intro">
              Help us improve the onboarding process by adding here feedback
              notes and optimization suggestions:
            </p>
            <div className="onboardee-dashboard-section__body">
              <p>Include here the feedback component</p>
            </div>
          </section>
        </>
      )}
    </article>
  );
}

export default OnboardeeDashboard;

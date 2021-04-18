import React, { useState, useEffect } from 'react';

import Greeting from './../dashboard/Greeting';
import BacklogList from './BacklogList';
import { getProcess } from './../../services/onboarding';

import './OnboardeeDashboard.scss';

function OnboardeeDashboard({ user }) {
  const [process, setProcess] = useState(null);

  useEffect(() => {
    const fetchProcess = async (id) => {
      const singleProcess = await getProcess(id);
      setProcess(singleProcess);
    };
    fetchProcess(user._id);
  }, []);

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
              Here is an overview about your main contact persons during
              your onboarding. Of course you can always reach out to
              other colleagues as well when you feel stuck. Check our
              team channel on slack.
            </p>
            <div className="onboardee-dashboard-section__body">
              <p>Include here the role card component</p>
              <div>
                Role Card: <div>User Card</div>
              </div>
              <div>
                Role Card: <div>User Card</div>
              </div>
            </div>
          </section>
          <section className="onboardee-dashboard__section onboardee-dashboard-section">
            <h2 className="onboardee-dashboard-section__headline">
              Onboarding Schedule
            </h2>
            <p className="onboardee-dashboard-section__intro">
              Calendar View of the weeks planned for the onboarding and
              the topics that should be followed each day.
            </p>
            <div className="onboardee-dashboard-section__body">
              <p>Include here the calendar component</p>
            </div>
          </section>
          <section className="onboardee-dashboard__section onboardee-dashboard-section">
            <h2 className="onboardee-dashboard-section__headline">
              Onboarding Backlog
            </h2>
            <p className="onboardee-dashboard-section__intro">
              Topics that couldn't be covered during the onboarding and
              should be approached as soon as possible in parallel with
              the projects, as part of the personal development plans.
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
              Help us improve the onboarding process by adding here
              feedback notes and optimization suggestions:
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

import React, { useState, useEffect } from "react";

import Greeting from "./../dashboard/Greeting";
import BacklogList from "./BacklogList";
import { getProcess } from "./../../services/onboarding";

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
    <>
      <Greeting user={user} />
      {process && (
        <>
          <section>
            <p>
              We are very happy to welcome you at XXX. Here is an overview of
              your onboarding plan for the next few weeks. Please approach your
              technical mentor for adjustments requests and use the feedback
              formular to send us suggestions regarding the process.
            </p>
          </section>
          <section>
            <h2>Contact Persons</h2>
            <p>
              Here is an overview about your main contact persons during your
              onboarding. Of course you can always reach out to other colleagues
              as well when you feel stuck. Check our team channel on slack.
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
          <section>
            <h2>Onboarding Backlog</h2>
            <p>
              Topics that couldn't be covered during the onboarding and should
              be approached as soon as possible in parallel with the projects,
              as part of the personal development plans.
            </p>
            <BacklogList
              process={process}
              onUpdate={(newProcess) => setProcess(newProcess)}
            />
          </section>
          <section>
            <h2>Feedback Notes</h2>
            <p>
              Help us improve the onboarding process by adding here feedback
              notes and optimization suggestions:
            </p>
          </section>
        </>
      )}
    </>
  );
}

export default OnboardeeDashboard;

import React, { useState, useEffect } from 'react';

import Greeting from './../dashboard/Greeting';
import TaskDetail from './../dashboard/TaskDetail';
import BacklogList from './BacklogList';
import WeekView from './WeekView';
import { getProcess } from './../../services/onboarding';

import './OnboardeeDashboard.scss';

function OnboardeeDashboard({ user }) {
  const [process, setProcess] = useState(null);
  const [activeTask, setActiveTask] = useState(false);
  const [activeTaskObj, setActiveTaskObj] = useState(null);

  useEffect(() => {
    const fetchProcess = async (id) => {
      const singleProcess = await getProcess(id);
      setProcess(singleProcess);
    };
    fetchProcess(user._id);
  }, [user._id]);

  let weekViews;
  if (process) {
    console.log(process.amountOfDays);
    const amountOfWeeks = Math.ceil(process.amountOfDays / 5);
    weekViews = () => {
      for (let n = 0; n < amountOfWeeks; n++) {
        console.log('Week', n + 1);
        return (
          <WeekView
            process={process}
            week={n + 1}
            updateViewTask={updateScheduledViewTask}
          />
        );
      }
    };
  }

  const updateScheduledViewTask = (id) => {
    console.log('Running:', id);
    console.log('Process:', process.scheduledTasks);
    const task = process.scheduledTasks.find(
      (task) => task.task && task.task._id === id
    );

    console.log('Task:', task);
    if (task) {
      setActiveTaskObj(task.task);
      setActiveTask(true);
    } else {
      setActiveTask(false);
    }
  };

  const updateBacklogViewTask = (id) => {
    const task = process.unscheduledTasks.find(
      (task) => task._id === id
    );
    if (task) {
      setActiveTaskObj(task);
      setActiveTask(true);
    } else {
      setActiveTask(false);
    }
  };

  return (
    <article className="onboardee-dashboard">
      {(activeTask && (
        <TaskDetail
          task={activeTaskObj}
          onClose={updateBacklogViewTask}
        />
      )) ||
        (process && (
          <>
            <Greeting user={user} corp={process.organization.name} />
            <section className="onboardee-dashboard__section onboardee-dashboard-section">
              <h2 className="onboardee-dashboard-section__headline">
                Contact Persons
              </h2>
              <p className="onboardee-dashboard-section__intro">
                Here is an overview about your main contact persons
                during your onboarding. Of course you can always reach
                out to other colleagues as well when you feel stuck.
                Check our team channel on slack.
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
                Calendar View of the weeks planned for the onboarding
                and the topics that should be followed each day.
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
                Topics that couldn't be covered during the onboarding
                and should be approached as soon as possible in parallel
                with the projects, as part of the personal development
                plans.
              </p>
              <div className="onboardee-dashboard-section__body">
                <BacklogList
                  process={process}
                  onUpdate={(newProcess) => setProcess(newProcess)}
                  updateViewTask={updateBacklogViewTask}
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
        ))}
    </article>
  );
}

export default OnboardeeDashboard;

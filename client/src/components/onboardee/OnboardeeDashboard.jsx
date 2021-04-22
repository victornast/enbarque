import React, { useState, useEffect } from "react";
import { Card, CardDeck } from "react-bootstrap";

import Greeting from "./../dashboard/Greeting";
import OnboardingFeedback from "./../dashboard/OnboardingFeedback";
import TaskDetail from "./../dashboard/TaskDetail";
import BacklogList from "./BacklogList";
import WeekView from "./WeekView";
import { getProcess, changeTaskStatus } from "./../../services/onboarding";
import * as AiIcons from "react-icons/ai";

// import { getPositionOptions } from './../../services/userOptions';

import "./OnboardeeDashboard.scss";

function OnboardeeDashboard({ user, seniorRole }) {
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

  const weekNumbers = [];
  if (process) {
    //console.log(process.amountOfDays);
    const amountOfWeeks = Math.ceil(process.amountOfDays / 5);
    for (let n = 1; n <= amountOfWeeks; n++) {
      weekNumbers.push(n);
    }
  }

  const updateScheduledViewTask = (id) => {
    //console.log("Running:", id);
    //console.log("Process:", process.scheduledTasks);
    const task = process.scheduledTasks.find(
      (task) => task.task && task.task._id === id
    );

    //console.log("Task:", task);
    if (task) {
      setActiveTaskObj(task);
      setActiveTask(true);
    } else {
      setActiveTask(false);
    }
  };

  const updateBacklogViewTask = (id) => {
    console.log(id);
    const task = process.unscheduledTasks.find((task) => task._id === id);
    console.log(task);
    if (task) {
      setActiveTaskObj(task);
      setActiveTask(true);
    } else {
      setActiveTask(false);
    }
  };

  const handleStatusChange = async (task) => {
    //console.log(task);
    const taskToBeUpdated = process.scheduledTasks.find(
      (scheduledTask) => scheduledTask.task._id === task.task._id
    );
    //console.log("task to be updated:", taskToBeUpdated);
    // taskToBeUpdated.taskStatus = "CLOSED";
    const updatedProcess = await changeTaskStatus(process._id, taskToBeUpdated);
    //console.log(updatedProcess);
    setProcess(updatedProcess);
  };
  return (
    <article className="onboardee-dashboard">
      {(activeTask && (
        <TaskDetail
          task={activeTaskObj}
          onClose={updateBacklogViewTask}
          onStatusChange={(task) => handleStatusChange(task)}
        />
      )) ||
        (process && (
          <>
            {(!seniorRole && (
              <Greeting user={user} corp={process.organization.name} />
            )) || (
              <h2>{user.firstName + " " + user.lastName}'s Onboarding Plan</h2>
            )}
            <section className="onboardee-dashboard__section onboardee-dashboard-section">
              <h2 className="onboardee-dashboard-section__headline">
                Contact Persons
              </h2>
              <p className="onboardee-dashboard-section__intro">
                Here is an overview about your main contact persons during your
                onboarding. Of course you can always reach out to other
                colleagues as well when you feel stuck. Check our team channel
                on slack.
              </p>
              <div className="onboardee-dashboard-section__body">
                <CardDeck>
                  <Card border="warning">
                    <Card.Header user={user} className="font-weight-bold">
                      <img
                        src={process.manager.avatar}
                        alt="avatar"
                        className="avatar"
                      />{" "}
                      &nbsp; Your Onboarding Mentor: {process.mentor.firstName}{" "}
                      {process.mentor.lastName}
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {process.manager.firstName} will guide and support you
                        through your onboarding process and answer any technical
                        questions.
                      </Card.Text>
                      <br />
                      <Card.Text>
                        <AiIcons.AiOutlineMail /> {process.mentor.email}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card border="warning">
                    <Card.Header user={user} className="font-weight-bold">
                      <img
                        src={process.manager.avatar}
                        alt="avatar"
                        className="avatar"
                      />{" "}
                      &nbsp; Your Engineering Manager:{" "}
                      {process.manager.firstName} {process.manager.lastName}
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {process.manager.firstName} will provide you feedback
                        and support you in your personal development path.
                      </Card.Text>
                      <br />
                      <Card.Text>
                        <AiIcons.AiOutlineMail /> {process.manager.email}
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
                {/* <p>Include here the calendar component</p> */}
                {weekNumbers.map((n) => (
                  <WeekView
                    process={process}
                    week={n}
                    key={n}
                    updateViewTask={updateScheduledViewTask}
                  />
                ))}
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
                  updateViewTask={updateBacklogViewTask}
                  user={user}
                  seniorRole={seniorRole}
                />
              </div>
            </section>
            <OnboardingFeedback
              process={process}
              user={user}
              seniorRole={seniorRole}
            />
          </>
        ))}
    </article>
  );
}

export default OnboardeeDashboard;

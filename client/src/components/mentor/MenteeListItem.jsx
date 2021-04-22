import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProcess } from "./../../services/onboarding";

const MenteeListItem = ({ mentee }) => {
  const [process, setProcess] = useState(null);

  useEffect(() => {
    const fetchProcess = async (id) => {
      const process = await getProcess(id);
      console.log(process);
      setProcess(process);
    };
    fetchProcess(mentee._id);
  }, [mentee._id]);

  let totalDuration = 0;
  let accomplishedDuration = 0;
  let progress = 0;

  if (process) {
    totalDuration = process.scheduledTasks.reduce(
      (totalDuration, task) => totalDuration + task.task.duration,
      0
    );
    const accomplishedTasks = process.scheduledTasks.filter(
      (task) => task.taskStatus === "CLOSED"
    );
    accomplishedDuration = accomplishedTasks.reduce(
      (totalDuration, task) => totalDuration + task.task.duration,
      0
    );
    progress = Math.round((accomplishedDuration / totalDuration) * 100);
  }

  return (
    <Link className="eb-link no-decoration" to={`/onboarding/${mentee._id}`}>
      <div className="mentee-item">
        <div className="mentee-item__name">
          {mentee.firstName} {mentee.lastName}
        </div>
        {process && (
          <div className="mentee-item__status">
            <p className="mentee-item__status__text">Progress: {progress}%</p>
            <progress value={progress} max="100">
              {progress}%
            </progress>
          </div>
        )}
      </div>
    </Link>
  );
};

export default MenteeListItem;

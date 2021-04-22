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
    <div className="mentee-item">
      <div className="mentee-item__name">
        <Link className="eb-link" to={`/onboarding/${mentee._id}`}>
          {mentee.firstName} {mentee.lastName}
        </Link>
      </div>
      {process && (
        <div className="mentee-item__status">
          Status: {progress}% accomplished
        </div>
      )}
    </div>
  );
};

export default MenteeListItem;

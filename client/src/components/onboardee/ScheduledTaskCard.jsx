import React from "react";
import { Link } from "react-router-dom";

const ScheduledTaskCard = (task) => {
  console.log(task);
  return (
    <div>
      <Link to={`/tasks/${task.task.task._id}`}>
        <h5 className="task-card">{task.task.task.headline}</h5>
      </Link>
    </div>
  );
};

export default ScheduledTaskCard;

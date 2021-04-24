import React from "react";
import "./TaskList.scss";

const TaskItem = ({ task, onAddTask }) => {
  const duration = task.duration;

  const handleClick = () => {
    onAddTask(task._id);
  };
  return (
    <div onClick={handleClick} className="task-item">
      <h5 className="task-item__headline">{task.headline}</h5>
      <small className="task-item__duration">
        {duration} {duration === 1 ? "hour" : "hours"}
      </small>
    </div>
  );
};

export default TaskItem;

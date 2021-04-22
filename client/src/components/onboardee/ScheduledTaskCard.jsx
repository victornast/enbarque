import React from 'react';

const ScheduledTaskCard = ({ task, updateViewTask }) => {
  console.log('Task:', task.task);
  return (
    <h5
      onClick={() => updateViewTask(task.task._id)}
      className="task-card"
    >
      {task.task.headline}
    </h5>
  );
};

export default ScheduledTaskCard;

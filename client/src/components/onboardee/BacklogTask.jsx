import React from 'react';
import './BacklogTask.scss';

const BacklogTask = ({ task, onDelete }) => {
  return (
    <div className="backlog-task">
      <p className="backlog-task__name">{task.headline}</p>
      <button className="backlog-task__action eb-button eb-button--primary">
        Schedule
      </button>
      <button
        onClick={onDelete}
        className="backlog-task__action eb-button eb-button--secondary"
      >
        Delete
      </button>
    </div>
  );
};

export default BacklogTask;

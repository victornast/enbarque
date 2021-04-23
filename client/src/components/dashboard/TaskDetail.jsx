import React, { useState } from 'react';

function TaskDetail({ task, onClose, onStatusChange }) {
  const [status, setStatus] = useState(task.taskStatus);
  const handleClick = () => {
    setStatus('CLOSED');
    onStatusChange(task);
  };
  return (
    <article className="task-detail">
      {(task.task && (
        <>
          <h2 className="task-detail__headline">
            {task.task.headline}
          </h2>
          <p className="task-detail__description">
            {task.task.description}
          </p>
        </>
      )) || (
        <>
          <h2 className="task-detail__headline">{task.headline}</h2>
          <p className="task-detail__description">{task.description}</p>
        </>
      )}
      {!!task.taskStatus && (
        <div className="task-detail__status-wrapper">
          Status:
          <span className={'task-detail__status__' + status}>
            {' '}
            {status}
          </span>
          {(status === 'OPEN' && (
            <button onClick={handleClick}>Mark as done!</button>
          )) ||
            ''}
        </div>
      )}
      <button onClick={() => onClose(null)}>Close</button>
    </article>
  );
}

export default TaskDetail;

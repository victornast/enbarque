import React from "react";

function TaskDetail({ task, onClose, onStatusChange }) {
  return (
    <article>
      <h2>{task.task.headline}</h2>
      <p>{task.task.description}</p>
      <span>{task.taskStatus}</span>
      <button onClick={() => onStatusChange(task)}>Mark as done!</button>
      <button onClick={() => onClose(null)}>Close</button>
    </article>
  );
}

export default TaskDetail;

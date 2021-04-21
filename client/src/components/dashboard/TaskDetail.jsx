import React from "react";

function TaskDetail({ task, onClose, onStatusChange }) {
  return (
    <article>
      <h2>{task.headline}</h2>
      <p>{task.description}</p>
      <button onClick={onStatusChange}>Mark as done!</button>
      <button onClick={() => onClose(null)}>Close</button>
    </article>
  );
}

export default TaskDetail;

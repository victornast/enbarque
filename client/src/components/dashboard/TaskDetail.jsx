import React, { useState } from "react";

function TaskDetail({ task, onClose, onStatusChange }) {
  const [status, setStatus] = useState("OPEN");
  const handleClick = () => {
    setStatus("CLOSED");
    onStatusChange(task);
  };
  return (
    <article>
      <h2>{task.task.headline}</h2>
      <p>{task.task.description}</p>
      <span>{status}</span>
      <button onClick={handleClick}>Mark as done!</button>
      <button onClick={() => onClose(null)}>Close</button>
    </article>
  );
}

export default TaskDetail;

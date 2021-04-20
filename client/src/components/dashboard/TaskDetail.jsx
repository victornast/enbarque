import React from 'react';

function TaskDetail({ task, onClose }) {
  return (
    <article>
      <h2>{task.headline}</h2>
      <p>{task.description}</p>
      <button onClick={() => onClose(null)}>Close</button>
    </article>
  );
}

export default TaskDetail;

import React from "react";

const SingleBacklogTask = ({ task }) => {
  return (
    <div>
      <p>{task.headline}</p>
      <button>Schedule</button>
    </div>
  );
};

export default SingleBacklogTask;

import React from "react";
import "./Backlog.scss";

const SingleBacklogTask = ({ task, onDelete }) => {
  return (
    <div className="single-backlog">
      <p className="single-backlog__headline">{task.headline}</p>
      <button className="btn btn__schedule">Schedule</button>
      <button onClick={onDelete} className="btn btn__delete">
        Delete
      </button>
    </div>
  );
};

export default SingleBacklogTask;

import React from "react";

const ScheduledTaskCard = (task) => {
  console.log(task);
  return (
    <div>
      <h5>{task.task.task.headline}</h5>
    </div>
  );
};

export default ScheduledTaskCard;

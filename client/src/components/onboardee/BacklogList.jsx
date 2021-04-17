import React from "react";
import SingleBacklogTask from "./SingleBacklogTask";

function BacklogList({ process }) {
  const backlogList = process.unscheduledTasks;
  console.log(backlogList);

  return (
    <div>
      {!!backlogList.length &&
        backlogList.map((task) => (
          <SingleBacklogTask key={task._id} task={task} />
        ))}
    </div>
  );
}

export default BacklogList;

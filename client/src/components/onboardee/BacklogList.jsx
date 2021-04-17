import React from "react";
import SingleBacklogTask from "./SingleBacklogTask";
import { editProcess } from "./../../services/onboarding";

function BacklogList({ process, onUpdate }) {
  const backlogList = process.unscheduledTasks;
  console.log(backlogList);

  const handleDeleteTask = async (processId, taskId) => {
    const newList = backlogList.filter((backlog) => backlog._id !== taskId);
    const data = {
      unscheduledTasks: [...newList],
    };
    const newProcess = await editProcess(processId, data);
    console.log(newProcess);
    onUpdate(newProcess);
  };
  return (
    <div>
      {!!backlogList.length &&
        backlogList.map((task) => (
          <SingleBacklogTask
            key={task._id}
            task={task}
            onDelete={() => handleDeleteTask(process._id, task._id)}
          />
        ))}
    </div>
  );
}

export default BacklogList;

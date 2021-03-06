import React, { useState } from 'react';
import BacklogTask from './BacklogTask';
import { editProcess } from './../../services/onboarding';
import TaskListGroup from '../tasks/TaskListGroup';
import './BacklogList.scss';

function BacklogList({
  process,
  onUpdate,
  updateViewTask,
  user,
  seniorRole
}) {
  const backlogList = process.unscheduledTasks;

  const [displayList, setDisplayList] = useState(false);

  const handleDeleteTask = async (processId, taskId) => {
    const newList = backlogList.filter(
      (backlog) => backlog._id !== taskId
    );
    const data = {
      unscheduledTasks: [...newList]
    };
    const newProcess = await editProcess(processId, data);
    //console.log(newProcess);
    onUpdate(newProcess);
  };

  const handleUpdate = (process) => {
    onUpdate(process);
  };

  return (
    <div className="backlog-wrapper">
      <ul className="backlog-list">
        {!!backlogList.length &&
          backlogList.map((task) => (
            <li key={task._id} className="backlog-list__item">
              <BacklogTask
                process={process}
                task={task}
                onDelete={() => handleDeleteTask(process._id, task._id)}
                onUpdate={(process) => handleUpdate(process)}
                updateViewTask={updateViewTask}
                seniorRole={seniorRole}
              />
            </li>
          ))}
      </ul>
      {seniorRole && (
        <button
          className="backlog-wrapper__action eb-button eb-button--primary eb-button--compact"
          onClick={() => setDisplayList(!displayList)}
        >
          {(displayList && 'X') || 'Add more tasks to the backlog'}
        </button>
      )}
      {displayList && (
        <TaskListGroup
          process={process}
          user={user}
          onUpdate={(process) => handleUpdate(process)}
        />
      )}
    </div>
  );
}

export default BacklogList;

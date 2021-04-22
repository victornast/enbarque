import React, { useState, useEffect } from 'react';
import { findTasks } from '../../services/task';
import TaskItem from './TaskItem';
import { addBacklogTask } from './../../services/onboarding';

const TaskListGroup = ({ user, onUpdate, process }) => {
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const allTasks = await findTasks();
      // console.log(allTasks);
      const allTasksIds = allTasks.map((task) => task._id);
      const backlogTasksIds = process.unscheduledTasks.map(
        (task) => task._id
      );
      // console.log(backlogTasksIds);
      // console.log(allTasksIds);
      const tasksIds = [];
      for (let task of allTasksIds) {
        if (!backlogTasksIds.includes(task)) {
          // console.log("in the if clause");
          tasksIds.push(task);
        }
      }
      const tasks = [];
      for (let task of allTasks) {
        if (tasksIds.includes(task._id)) {
          tasks.push(task);
        }
      }
      // console.log(tasks);
      setTasks(tasks);
      setLoaded(true);
    };
    fetchTasks();
  }, [process]);

  const addTask = async (task) => {
    const newProcess = await addBacklogTask(process._id, task);
    console.log(
      'Added Task to Backlog list',
      newProcess.unscheduledTasks
    );
    onUpdate(newProcess);
  };

  return (
    <div>
      {loaded
        ? tasks.map((task) => {
            return (
              <TaskItem
                key={task._id}
                onAddTask={addTask}
                task={task}
              />
            );
          })
        : ''}
    </div>
  );
};

export default TaskListGroup;

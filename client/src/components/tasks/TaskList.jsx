import React, { useState, useEffect } from "react";
import { findTasks } from "./../../services/task";

const TaskList = ({ user }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await findTasks();
      console.log(tasks);
      setTasks(tasks);
    };
    fetchTasks();
  }, [user._id]);

  return (
    <div>
      {!!tasks.length &&
        tasks.map((item) => {
          <div>item._id</div>;
        })}
    </div>
  );
};

export default TaskList;

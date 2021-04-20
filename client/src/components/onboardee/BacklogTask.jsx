import React, { useState } from "react";
import "./BacklogTask.scss";
import ScheduledTaskCard from "./ScheduledTaskCard";
import TimePicker from "./TimePicker";
import { scheduleTask } from "./../../services/onboarding";

const BacklogTask = ({ process, task, onDelete, onUpdate }) => {
  const [pickerDisplay, setPickerDisplay] = useState(false);
  const [pickedDate, setPickedDate] = useState(null);
  const [backlogList, setBacklogList] = useState(process.unscheduledTasks);

  const handleScheduleTask = async () => {
    const newBacklogList = backlogList.filter(
      (backlog) => backlog._id === task._id
    );
    const updatedProcess = await scheduleTask(
      process._id,
      task._id,
      pickedDate,
      newBacklogList
    );
    console.log(updatedProcess);
    onUpdate(updatedProcess);
  };

  return (
    <div className="backlog-task">
      <p className="backlog-task__name">{task.headline}</p>
      {(pickerDisplay && (
        <>
          <TimePicker
            onClick={handleScheduleTask}
            onDateChange={(date) => setPickedDate(date)}
          />
          <button
            onClick={handleScheduleTask}
            className="backlog-task__action eb-button eb-button--primary"
          >
            Save
          </button>
          <button
            onClick={() => setPickerDisplay(!pickerDisplay)}
            className="backlog-task__action eb-button eb-button--secondary"
          >
            Cancel
          </button>
        </>
      )) || (
        <>
          <button
            onClick={() => setPickerDisplay(!pickerDisplay)}
            className="backlog-task__action eb-button eb-button--primary"
          >
            Schedule
          </button>
          <button
            onClick={onDelete}
            className="backlog-task__action eb-button eb-button--secondary"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default BacklogTask;

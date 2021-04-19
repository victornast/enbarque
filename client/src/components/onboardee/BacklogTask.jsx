import React, { useState } from "react";
import "./BacklogTask.scss";
import ScheduledTaskCard from "./ScheduledTaskCard";
import TimePicker from "./TimePicker";
import { scheduleTask } from "./../../services/onboarding";

const BacklogTask = ({ process, task, onDelete }) => {
  const [pickerDisplay, setPickerDisplay] = useState(false);
  const [pickedDate, setPickedDate] = useState(null);

  const handleScheduleTask = async () => {
    const updatedProcess = await scheduleTask(
      process._id,
      task._id,
      pickedDate
    );
    console.log(updatedProcess);
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
          <button className="backlog-task__action eb-button eb-button--primary">
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

import React, { useState } from "react";
import "./BacklogTask.scss";
import TimePicker from "./TimePicker";
import { scheduleTask } from "./../../services/onboarding";

const BacklogTask = ({ process, task, onDelete, onUpdate, updateViewTask }) => {
  const [pickerDisplay, setPickerDisplay] = useState(false);
  const [pickedDate, setPickedDate] = useState(null);

  const handleScheduleTask = async () => {
    const newBacklogList = process.unscheduledTasks.filter(
      (backlog) => backlog._id !== task._id
    );
    const updatedProcess = await scheduleTask(
      process._id,
      task._id,
      pickedDate,
      newBacklogList
    );
    //console.log(updatedProcess);
    onUpdate(updatedProcess);
    setPickerDisplay(!pickerDisplay);
  };

  return (
    <div className="backlog-task">
      <p
        onClick={() => updateViewTask(task._id)}
        className="backlog-task__name"
      >
        {task.headline}
      </p>
      {(pickerDisplay && (
        <div className="time-picker__wrapper">
          <TimePicker
            onClick={handleScheduleTask}
            onDateChange={(date) => setPickedDate(date)}
          />
          <div className="time-picker__button-group">
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
          </div>
        </div>
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

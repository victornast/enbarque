import React, { Component } from "react";
import "./Schedule.scss";
import ScheduledTaskCard from "./ScheduledTaskCard";

export class DayCard extends Component {
  render() {
    const scheduledTasks = this.props.process.scheduledTasks;
    const startDate = new Date(this.props.startDate);
    const date = startDate.setDate(startDate.getDate() + this.props.nDay - 1);
    const displayDate = new Date(date).toDateString();
    const taskOfTheDay = scheduledTasks.filter(
      (task) =>
        new Date(task.startingTimeSlot).getDate() === new Date(date).getDate()
    );
    console.log(taskOfTheDay);
    return (
      <div className="day-card">
        <h2 className="day-card__OBday">Day {this.props.nDay}</h2>
        <h3 className="day-card__date">{displayDate}</h3>
        <div className="day-card__tasks">
          {scheduledTasks &&
            taskOfTheDay.map((task) => (
              <ScheduledTaskCard key={task.task._id} task={task} />
            ))}
        </div>
      </div>
    );
  }
}

export default DayCard;

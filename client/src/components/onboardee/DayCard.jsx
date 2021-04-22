import React, { Component } from "react";
import "./Schedule.scss";
import ScheduledTaskCard from "./ScheduledTaskCard";

export class DayCard extends Component {
  render() {
    const scheduledTasks = this.props.process.scheduledTasks;
    const startDate = new Date(this.props.startDate);
    const date = startDate.setDate(startDate.getDate() + this.props.nDay - 1);
    const displayDate = new Date(date).toDateString().slice(0, -4);
    const taskOfTheDay = scheduledTasks.filter(
      (task) =>
        new Date(task.startingTimeSlot).getDate() === new Date(date).getDate()
    );
    // console.log(taskOfTheDay);
    return (
      <div className="day-card">
        <div className="day-card__header">
          <h4 className="day-card__header__OBday">Day {this.props.nDay}</h4>
          <h3 className="day-card__header__date">{displayDate}</h3>
        </div>
        <div className="day-card__tasks">
          {!!taskOfTheDay &&
            taskOfTheDay.map(
              (task) =>
                task.task && (
                  <ScheduledTaskCard
                    key={task.task._id}
                    task={task}
                    updateViewTask={this.props.updateViewTask}
                  />
                )
            )}
        </div>
      </div>
    );
  }
}

export default DayCard;

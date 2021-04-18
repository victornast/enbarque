import React, { Component } from "react";
import DayCard from "./DayCard";
import "./Schedule.scss";

export class WeekView extends Component {
  render() {
    const startDate = this.props.process.startingDate;
    return (
      <div className="week-view">
        <DayCard
          process={this.props.process}
          startDate={startDate}
          nDay={this.props.week * 5 - 4}
        />
        <DayCard
          process={this.props.process}
          startDate={startDate}
          nDay={this.props.week * 5 - 3}
        />
        <DayCard
          process={this.props.process}
          startDate={startDate}
          nDay={this.props.week * 5 - 2}
        />
        <DayCard
          process={this.props.process}
          startDate={startDate}
          nDay={this.props.week * 5 - 1}
        />
        <DayCard
          process={this.props.process}
          startDate={startDate}
          nDay={this.props.week * 5}
        />
      </div>
    );
  }
}

export default WeekView;

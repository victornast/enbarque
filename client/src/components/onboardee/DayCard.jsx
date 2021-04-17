import React, { Component } from "react";
import "./Schedule.scss";

export class DayCard extends Component {
  render() {
    const startDate = new Date(this.props.startDate);
    const date = startDate.setDate(startDate.getDate() + this.props.nDay - 1);
    const displayDate = new Date(date).toDateString();
    return (
      <div className="day-card">
        <h2>Day {this.props.nDay}</h2>
        <h3>{displayDate}</h3>
      </div>
    );
  }
}

export default DayCard;

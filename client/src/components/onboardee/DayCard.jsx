import React, { Component } from "react";
import "./Schedule.scss";

export class DayCard extends Component {
  render() {
    const startDate = new Date(this.props.startDate);
    console.log(startDate);
    const date = startDate.setDate(startDate.getDate() + this.props.nDay);
    const displayDate = new Date(date).toDateString();
    console.log(date);
    console.log(displayDate);
    return (
      <div className="day-card">
        <h2>Day {this.props.nDay}</h2>
        <h3>{displayDate}</h3>
      </div>
    );
  }
}

export default DayCard;

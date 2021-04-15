import React from "react";
import EmployeeCardSmall from "./EmployeeCardSmall";
import "./EmployeeList.scss";

const EmployeeList = ({ employees, user }) => {
  // console.log(user._id);
  const employeesList = employees.filter(
    (employee) => employee._id !== user._id
  );
  return (
    <div>
      <div className="table">
        <div className="table__header">
          <div className="table__row">
            <span>Name</span>
            <span>Position</span>
            <span>Level</span>
            <span>Onboarding role</span>
            <span>Profile</span>
          </div>
        </div>
        {employeesList.map((employee) => (
          <EmployeeCardSmall
            className="card--small"
            key={employee._id}
            employee={employee}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;

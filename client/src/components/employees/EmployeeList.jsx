import React from "react";
import EmployeeCardSmall from "./EmployeeCardSmall";
import "./EmployeeList.scss";

const EmployeeList = ({ employees, user, plans }) => {
  // console.log(user._id);
  const hasPlan = (employee) => {
    plans.filter((plan) => plan[employee.role]._id === employee._id);
  };

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
            <span>Onboarding plan</span>
            <span>Profile</span>
          </div>
        </div>
        {employeesList.map((employee) => (
          <EmployeeCardSmall
            className="card--small"
            key={employee._id}
            employee={employee}
            plan={hasPlan(employee)}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;

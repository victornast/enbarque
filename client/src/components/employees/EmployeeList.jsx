import React from 'react';
import EmployeeCardSmall from './EmployeeCardSmall';
import './EmployeeList.scss';

const EmployeeList = ({ employees, user, plans }) => {
  const hasPlan = (employee) => {
    const plan = plans.find((plan) => plan.onboardee === employee._id);
    return plan;
  };
  const employeesList = employees.filter(
    (employee) => employee._id !== user._id
  );

  return (
    <div className="eb-employee-list">
      <div className="table__header">
        <span>Name</span>
        <span>Position</span>
        <span>Level</span>
        <span>Onboarding plan</span>
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
  );
};

export default EmployeeList;

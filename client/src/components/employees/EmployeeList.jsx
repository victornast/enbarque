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
  // const employeesListWithPlans = employeesList.map(
  //   (employee) => {
  //     const plan = hasPlan(employee);
  //     return { ...employee, plan };
  //   });

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

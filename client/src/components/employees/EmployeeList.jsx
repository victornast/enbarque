import React from "react";
import EmployeeCardSmall from "./EmployeeCardSmall";

const EmployeeList = ({ employees }) => {
  console.log(employees);
  return (
    <div>
      {employees.map((employee) => (
        <EmployeeCardSmall key={employee._id} employee={employee} />
      ))}
    </div>
  );
};

export default EmployeeList;

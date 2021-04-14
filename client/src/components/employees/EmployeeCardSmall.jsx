import React from "react";
import { Link } from "react-router-dom";

const EmployeeCardSmall = ({ employee }) => {
  console.log(employee);
  return (
    <div>
      <span>
        {employee.firstName} {employee.lastName}
      </span>
      {(employee.position && <span>{employee.position.name}</span>) || ""}
      {(employee.level && <span>{employee.level.name}</span>) || ""}
      {(employee.role && <span>{employee.role.name}</span>) || ""}
      <Link to={`/onboarding/${employee._id}`}>Assign to onboarding </Link>
      <Link to={`/auth/${employee._id}/profile`}>Edit</Link>
    </div>
  );
};

export default EmployeeCardSmall;

import React from "react";

const EmployeeCardSmall = ({ employee }) => {
  return (
    <div>
      <span>
        {employee.firstName} {employee.lastName}
      </span>
      <span>{employee.position.name}</span>
      <span>{employee.level.name}</span>
      <span>{employee.role.name}</span>
      <button>Assign to onboarding</button>
      <button>Edit Profile</button>
    </div>
  );
};

export default EmployeeCardSmall;

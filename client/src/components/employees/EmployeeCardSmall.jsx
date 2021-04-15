import React from "react";
import { Link } from "react-router-dom";

const EmployeeCardSmall = ({ employee, plan }) => {
  console.log(plan);
  return (
    <div className="table__row">
      <span>
        {employee.firstName} {employee.lastName}
      </span>
      <span>
        {(employee.position && <span>{employee.position.name}</span>) || "n/a"}
      </span>
      <span>
        {(employee.level && <span>{employee.level.name}</span>) || "n/a"}
      </span>
      <span>
        {(employee.role && <span>{employee.role.name}</span>) || "n/a"}
      </span>
      <span>
        {(plan && (
          <Link className="table__btn--assign" to={`/onboarding/${plan._id}`}>
            Edit
          </Link>
        )) || (
          <Link
            className="table__btn--assign"
            to={`/onboarding/create/${employee._id}`}
          >
            Create
          </Link>
        )}
      </span>
      <span>
        <Link className="table__btn--view" to={`/corp/user/${employee._id}`}>
          View / Edit
        </Link>
      </span>
    </div>
  );
};

export default EmployeeCardSmall;

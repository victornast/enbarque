import React from "react";
import { Link } from "react-router-dom";

const EmployeeCardSmall = ({ employee }) => {
  // console.log(employee);
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
        {(employee.role && <span>{employee.role.name}</span>) || (
          <Link
            className="table__btn--assign"
            to={`/onboarding/${employee._id}`}
          >
            Assign
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

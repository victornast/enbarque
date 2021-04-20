import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeCardSmall = ({ employee, plan }) => {
  return (
    <div className="table__row">
      <span>
        <Link to={`/corp/user/${employee._id}`}>
          {employee.firstName} {employee.lastName}
        </Link>
      </span>
      <span>
        {(employee.position && <span>{employee.position.name}</span>) ||
          'n/a'}
      </span>
      <span>
        {(employee.level && <span>{employee.level.name}</span>) ||
          'n/a'}
      </span>
      <span>
        {(employee.role && <span>{employee.role.name}</span>) || 'n/a'}
      </span>
      <span>
        {(employee.role.name === 'Onboardee' && plan && (
          <Link
            className="table__btn--assign"
            to={`/onboarding/${plan._id}`}
          >
            Edit
          </Link>
        )) ||
          (employee.role.name === 'Onboardee' && !plan && (
            <Link
              className="table__btn--assign"
              to={{
                pathname: `/onboarding/create/${employee._id}`,
                state: { onboardee: employee }
              }}
            >
              Create
            </Link>
          )) ||
          (employee.role.name === 'Mentor' && (
            <Link
              className="table__btn--edit"
              to={`/onboarding/mentorship/${employee._id}}`}
            >
              Edit
            </Link>
          ))}
      </span>
    </div>
  );
};

export default EmployeeCardSmall;

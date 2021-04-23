import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeCardSmall = ({ employee, plan }) => {
  return (
    <div className="table__row">
      <span>
        <Link className="eb-link" to={`/corp/user/${employee._id}`}>
          {employee.firstName} {employee.lastName}
        </Link>
      </span>
      <span>
        {(employee.position && employee.position.name) || 'n/a'}
      </span>
      <span>{(employee.level && employee.level.name) || 'n/a'}</span>
      <span>
        {(employee.role.name === 'Onboardee' && plan && (
          <Link
            className="eb-button eb-button--secondary eb-button--compact"
            to={`/onboarding/${employee._id}`}
          >
            Edit OnB Plan
          </Link>
        )) ||
          (employee.role.name === 'Onboardee' && !plan && (
            <Link
              className="eb-button eb-button--primary eb-button--compact"
              to={{
                pathname: `/onboarding/create/${employee._id}`,
                state: { onboardee: employee }
              }}
            >
              Create OnB Plan
            </Link>
          )) ||
          (employee.role.name === 'Mentor' && (
            <Link
              className="eb-button eb-button--secondary eb-button--compact"
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

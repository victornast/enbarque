import React, { Component } from "react";
import EmployeeList from "./../components/employees/EmployeeList";
import { findUsers } from "./../services/organization";

class ManagerDashboard extends Component {
  state = {
    employees: [],
  };

  async componentDidMount() {
    const users = await findUsers();
    this.setState({
      employees: users,
    });
  }

  render() {
    const manager = this.props.user;
    return (
      <div>
        {!!this.state.employees.length && (
          <>
            <h1>Manager Dashboard</h1>
            <h3>
              Manager: {manager.firstName} {manager.lastName}
            </h3>
            <h3>Employees:</h3>
            <EmployeeList employees={this.state.employees} user={manager} />
          </>
        )}
      </div>
    );
  }
}

export default ManagerDashboard;
